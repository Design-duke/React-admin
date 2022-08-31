const files: any = import.meta.glob("./modules/*.ts", { eager: true });

const modules: any = {};
for (const key in files) {
  modules[key.replace(/(\.\/modules\/|\.ts)/g, "")] = files[key].default;
}

export default {
  ...modules,
};
