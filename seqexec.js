var seqexec = {
    config: {
        time: 200,  // 每隔200毫秒检测一次
        // steps: 2    // 共有要执行2步骤
    },
    close: false,   // 关闭检测
    stepDone: 0,    // 当前完成的步骤
    _fns: {},       // 函数队列
    // 结构入队列
    when: function(fn) {
        let step = 1;
        this._fns[step] = fn;
        return this
    },
    then: function(fn) {
        let step;
        for (i in this._fns) {
            step = i;
        }
        this._fns[parseInt(step)+1] = fn;
        return this
    },
    // 处理执行,定期检测
    start: function() {
        let step = 1;
        this._runAndDetect(step);
        return this
    },
    next: function() {
        // 是否有下一步未执行的函数
        let step;
        for (i in this._fns) {
            step = i;
        }
        if (this.stepDone >= step) {
            return this
        }
        this._runAndDetect(parseInt(this.stepDone) + 1);
        return this
    },
    _runAndDetect: function(step) {
        let ths = this
        // 执行第一个函数
        this._fns[step](step);
        // 定时检测执行状态
        let seqInterval = setInterval(function(){
            if (ths.close) {
                clearInterval(seqInterval);
            }
            if (ths.stepDone == step) {
                clearInterval(seqInterval);
                ths.next();
            }
        }, this.config.time);
    },
};
