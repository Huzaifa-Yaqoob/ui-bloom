import { GetTypeByName } from "@content-collections/core";

import configuration from "../../content-collections.ts";

export type Post = GetTypeByName<typeof configuration, "posts">;
export declare const allPosts: Array<Post>;

export {};
