import dayjs from "npm:dayjs";

console.error("Deno.args: ", Deno.args);
if (Deno.args.length < 2) {
  console.error(`必须带上2个参数 srcDir filePrefix`);
  console.error(`deno run -A scripts/04-make-tgz-file.ts srcDir filePrefix`);
  Deno.exit(1);
}

const srcDir = Deno.args[0];
const filePrefix = Deno.args[1];
// console.error('filePrefix: ', filePrefix)
const today = dayjs().format("YYYYMMDD_HHmmss");
// console.error('today : ', today)

try {
  const ss = Deno.statSync(srcDir);
} catch (error) {
  console.error(`目录不存在: ${srcDir}`);
  Deno.exit(1);
}

const fileName = `${filePrefix}_${today}.tar.gz`;
// let fileName = ''
// for (let ii = 1; ii < 999; ii++) {
//   const str = `${ii}`.padStart(3, '0')
//   fileName = `${filePrefix}_${today}_${str}.zip`
//   try {
//     const ss = Deno.statSync(fileName)
//     // console.error('ss: ', ss)
//   } catch (error) {
//     if (error instanceof Deno.errors.NotFound) {
//       break
//     }
//   }
// }
// console.error('fileName: ', fileName)

const subp = new Deno.Command("tar", {
  args: ["-cvzf", fileName, srcDir],
  stdout: "inherit",
});
const outObj = await subp.output();
console.error("code: ", outObj.code);
console.error("完成, 生成压缩包 ", fileName);
