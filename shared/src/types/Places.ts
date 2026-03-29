import * as v from "valibot";
import type { Collection } from "./Collection.js";

export const PlaceUrlSchema = v.object({
  name: v.optional(v.string()),
  type: v.optional(v.string()),
  url: v.string(),
});

export const PlaceImageSchema = v.object({
  description: v.optional(v.string()),
  fileName: v.optional(v.string()),
  folder: v.optional(v.string()),
  id: v.pipe(v.number(), v.integer(), v.minValue(1)),
  name: v.optional(v.string()),
  role: v.optional(v.string()),
});

export const PlaceSchema = v.object({
  address: v.optional(v.string()),
  city: v.optional(v.string()),
  country: v.optional(v.string()),
  description: v.optional(v.string()),
  id: v.pipe(v.number(), v.integer(), v.minValue(1)),
  images: v.optional(v.array(PlaceImageSchema)),
  lat: v.optional(v.number()),
  lon: v.optional(v.number()),
  name: v.pipe(v.string(), v.minLength(1)),
  region: v.optional(v.string()),
  state: v.optional(v.string()),
  tags: v.optional(v.array(v.string())),
  type: v.optional(v.string()),
  urls: v.optional(v.array(PlaceUrlSchema)),
  visited: v.optional(v.boolean()),
});

export type PlaceUrl = v.InferOutput<typeof PlaceUrlSchema>;
export type PlaceImage = v.InferOutput<typeof PlaceImageSchema>;
export type Place = v.InferOutput<typeof PlaceSchema>;

/**
 * Places collection type
 * Wraps Place items in a Collection structure
 */
export type Places = Collection<Place>;
