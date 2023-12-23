## 更新发版

1. 修改代码
2. 提交
3. 打 tag: `git tag vx.x.x`
4. `git push origin main --tags` 推送代码, 有 webhook 它会自动更新 deno 包
5. 在需要的地方执行 安装/升级 命令进行更新

## 安装/升级

```
deno install -rqfA https://deno.land/x/hdltool/03-make-zip-file.ts -n make-zip-file
```