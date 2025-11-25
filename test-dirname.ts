console.log("Checking import.meta.dirname");
try {
    console.log(import.meta.dirname);
} catch (e) {
    console.error("import.meta.dirname is not supported");
    console.error(e);
}
