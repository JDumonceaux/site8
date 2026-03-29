import type { Express, RequestHandler } from 'express';

import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { Logger } from '../utils/logger.js';

type RouteConfig = {
  readonly mutations?: boolean;
  readonly path: string;
};

type RouteModule = {
  readonly routeConfig?: RouteConfig;
  readonly [key: string]: unknown;
};

const ROUTES_DIR = fileURLToPath(new URL('../app/routes/', import.meta.url));

const hasRouteConfig = (
  routeModule: RouteModule,
): routeModule is RouteModule & { readonly routeConfig: RouteConfig } => {
  return typeof routeModule.routeConfig?.path === 'string';
};

const isRequestHandler = (value: unknown): value is RequestHandler => {
  return typeof value === 'function';
};

export const registerRoutes = async (
  app: Express,
  mutationLimiter: RequestHandler,
): Promise<void> => {
  const routeFiles = readdirSync(ROUTES_DIR)
    .filter((fileName) => fileName.endsWith('Router.js'))
    .toSorted();

  for (const fileName of routeFiles) {
    const moduleUrl = pathToFileURL(path.join(ROUTES_DIR, fileName));
    const routeModule = (await import(moduleUrl.href)) as RouteModule;

    if (!hasRouteConfig(routeModule)) {
      continue;
    }

    const exportName = path.basename(fileName, '.js');
    const router = routeModule[exportName];

    if (!isRequestHandler(router)) {
      Logger.warn('Skipping route registration for invalid router export', {
        exportName,
        fileName,
      });
      continue;
    }

    if (routeModule.routeConfig.mutations) {
      app.use(routeModule.routeConfig.path, mutationLimiter, router);
    } else {
      app.use(routeModule.routeConfig.path, router);
    }

    Logger.info('Registered route', {
      fileName,
      mutations: routeModule.routeConfig.mutations ?? false,
      path: routeModule.routeConfig.path,
    });
  }
};
