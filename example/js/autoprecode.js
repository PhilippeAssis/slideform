(function ($) {
    $.fn.autoprecode = function (targets, customOpt) {
        "use strict";

        var opt = {
            'type': 'link',
            'code' : false
        }

        $.extend(opt, customOpt);

        var base = $('<div>').addClass('autoprecode');

        var obj = {}
        obj.targets = $(this).find(targets).not('.no-autoprecode');

        obj.fn = {
            'escapeHtml': function escapeHtml(text) {
                return text
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            },

            'generate': function () {
                for (var i = 0; i < obj.targets.length; i++) {
                    var add = null, pre = null, content = '';
                    var target = $(obj.targets[i]);
                    var targetClone = target.clone()
                    var cBase = base.clone();
                    $('.no-autoprecode', targetClone).remove();
                    var html = obj.fn.escapeHtml(targetClone[0].outerHTML)

                    var code = target.data('code');

                    if(!code && opt.code != false)
                        code = opt.code;

                    if (opt.type == 'link') {
                        add = $('<a>').addClass('link').text("Ver esse código");
                        cBase.append(add);
                    }

                    pre = $('<pre>').addClass('hide')


                    if(code){
                        code = $('<code>').addClass(code).html(html);
                        pre.append(code);
                    }
                    else
                        pre.html(html);

                    cBase.append(pre)

                    target.append(cBase[0].outerHTML);
                }
            }
        }


        $(document).on('click', '.autoprecode .link', function () {
            var $this = $(this)
            var parent = $this.parents('.autoprecode');
            if (!$this.hasClass('open')) {
                $this.text('Esconder código').addClass('open')
                $('pre', parent).removeClass('hide')
            }
            else {
                $this.text('Ver esse código').removeClass('open')
                $('pre', parent).addClass('hide')
            }
        })

        obj.fn.generate()

    }
})(jQuery);
