import dayjs from 'npm:dayjs'

if (Deno.args.length < 2) {
  console.log(`必须带上2个参数 srcDir filePrefix`)
  console.log(`deno run -A scripts/03.make-zip-file.ts srcDir filePrefix`)
  Deno.exit(1)
}

const srcDir = Deno.args[0]
const filePrefix = Deno.args[1]
// console.log('filePrefix: ', filePrefix)
const today = dayjs().format('YYYYMMDD_HHmm')
// console.log('today : ', today)

try {
  const ss = Deno.statSync(srcDir)
} catch (error) {
  console.log(`目录不存在: ${srcDir}`)
  Deno.exit(1)
}

const fileName = `${filePrefix}_${today}.zip`
// let fileName = ''
// for (let ii = 1; ii < 999; ii++) {
//   const str = `${ii}`.padStart(3, '0')
//   fileName = `${filePrefix}_${today}_${str}.zip`
//   try {
//     const ss = Deno.statSync(fileName)
//     // console.log('ss: ', ss)
//   } catch (error) {
//     if (error instanceof Deno.errors.NotFound) {
//       break
//     }
//   }
// }
// console.log('fileName: ', fileName)

const subp = Deno.run({
  cmd: ['zip', '-r', fileName, srcDir],
})
const status = await subp.status()
console.log('status: ', status)
console.log('完成, 生成压缩包 ', fileName)
