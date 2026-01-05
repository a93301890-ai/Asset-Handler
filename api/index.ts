import express, { Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { setupVite, serveStatic, log } from "../server/vite";
import http from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let resBody: any;
  const oldJson = res.json;
  res.json = function (body) {
    resBody = body;
    return oldJson.apply(res, arguments as any);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (resBody) {
        logLine += ` :: ${JSON.stringify(resBody)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.substring(0, 79) + "…";
      }
      log(logLine);
    }
  });
  next();
});

const server = http.createServer(app);

(async () => {
  await registerRoutes(server, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
})();

export default app;
