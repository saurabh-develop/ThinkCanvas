import "dotenv/config";
import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import helmet from "helmet";
import authMiddleware from "./middleware/auth-middleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Properly define the proxyOptions object
const proxyOptions = {
  proxyReqPathResolver: (req) => {
    const resolved = req.originalUrl.replace(/^\/v1/, "/api");

    // Debug output
    console.log("[Gateway] Resolving path:", req.originalUrl, "→", resolved);

    // Catch malformed paths
    if (resolved.includes("/:") || resolved.match(/\/:($|[^a-zA-Z])/)) {
      throw new Error(`Invalid path: ${resolved}`);
    }

    return resolved;
  },
  userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
    return {
      ...headers,
      "Access-Control-Allow-Origin":
        process.env.FRONTEND_URL || "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  },
  proxyErrorHandler: (err, res, next) => {
    res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  },
};

// ✅ Routes using the above proxy options
app.use("/v1/designs", authMiddleware, proxy(process.env.DESIGN, proxyOptions));

app.use(
  "/v1/media/upload",
  authMiddleware,
  proxy(process.env.UPLOAD, {
    ...proxyOptions,
    parseReqBody: false,
  })
);

app.use(
  "/v1/media",
  authMiddleware,
  proxy(process.env.UPLOAD, {
    ...proxyOptions,
    parseReqBody: true,
  })
);

app.use(
  "/v1/subscription",
  authMiddleware,
  proxy(process.env.SUBSCRIPTION, proxyOptions)
);

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
  console.log(`DESIGN Service is running on port ${process.env.DESIGN}`);
  console.log(`UPLOAD Service is running on port ${process.env.UPLOAD}`);
  console.log(
    `SUBSCRIPTION Service is running on port ${process.env.SUBSCRIPTION}`
  );
});
