# seqexec
js按顺序执行，解决多层回调嵌套的问题。不需要依赖其他类库。

## 使用很简单
```
// seqexec.config.time = 500; // 检测频率，默认200毫秒
seqexec.when(function(step){
    ...
    // 这步完成了可以下一步了
    seqexec.stepDone = step;
    ...
}).then(function(step){
    ...
    // 下一步我不想检测执行了
    seqexec.close();
    ...
}).start();
```

## 测一测

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  
</body>
<script src="https://cdn.bootcss.com/jquery/1.10.1/jquery.js"></script>
<script src="https://cdn.bootcss.com/layer/2.3/layer.js"></script>
<script src="seqexec.js"></script>
<script>
seqexec.when(function(step){
    layer.open({
        content: '您确定要刷新一下本页面吗？1',
        btn: ['刷新', '不要'],
        yes: function(index){
          layer.close(index);
          console.log('页面1');
          seqexec.stepDone = step;
        }
    });
}).then(function(step){
    layer.open({
        content: '您确定要刷新一下本页面吗？2',
        btn: ['刷新', '不要'],
        yes: function(index){
          layer.close(index);
          console.log('页面2');
          seqexec.stepDone = step;
        }
    });
}).then(function(step){
    console.log(step);
}).start();
// 页面1
// 页面2
// 3
</script>
</html>
```

## LICENSE
MIT
