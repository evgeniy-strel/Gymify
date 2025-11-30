import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    enabled: false,
  },
  global: {
    fetch: async (url, options = {}) => {
      try {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        // Безопасное создание заголовков
        const headers = new Headers(options.headers || {});

        if (isMobile) {
          headers.set("X-Client-Type", "mobile");
          headers.set("X-Client-Platform", navigator.platform);
          headers.set("X-Client-Version", "1.0.0");
        }

        // Создаем опции для fetch
        const fetchOptions: RequestInit = {
          ...options,
          headers,
        };

        // Добавляем только для GET запросов
        if ((!options.method || options.method === "GET") && isMobile) {
          fetchOptions.keepalive = true;
          fetchOptions.cache = "no-store";
        }

        console.log(
          `📡 Fetching: ${url.toString().split("/rest/v1/")[1] || url}`
        );

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
          console.error(
            `❌ Fetch failed: ${response.status} ${response.statusText}`
          );
        }

        return response;
      } catch (error) {
        throw error;
      }
    },
  },
  auth: {
    autoRefreshToken: false,
    persistSession: true,
  },
});
