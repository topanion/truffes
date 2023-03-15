import { createClient } from "@supabase/supabase-js";
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

export const supabase = createClient(
	serverRuntimeConfig.supaUrl,
	serverRuntimeConfig.supaKey
);
