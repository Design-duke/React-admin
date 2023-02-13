import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "./",
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    plugins: [react()],
    server: {
      base: "./",
      host: "0.0.0.0",
      open: true,
      proxy: {
        "/dev": {
          target: "http://",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev/, ""),
        },
      },
    },
    build: {
      outDir: "dist",
      // esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
      minify: "esbuild",
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
      // terserOptions: {
      //   compress: {
      //     drop_console:
      //       process.env.VITE_NODE_ENV === "production" ? true : false,
      //     drop_debugger: true,
      //   },
      // },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
  };
});
