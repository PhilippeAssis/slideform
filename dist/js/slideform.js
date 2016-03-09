(function ($) {
    $.fn.slideform = function (customFn) {
        "use strict";

        var obj, defaultFunctions;

        obj = {};
        obj.target = this;
        obj.target.itens = obj.target.find('section, form').not('.only-review');
        obj.target.current = {
            position: -1,
            object: null
        };

        defaultFunctions = {
            'nextSection': function () {
                if (obj.target.current.object) {
                    var required = obj.target.current.object.find('[required],[data-required]');
                    var itens = new Array();
                    if (required.length) {
                        for (var i = 0; i < required.length; i++) {
                            var item = $(required[i]);

                            if (!item.val()) {
                                var response = {
                                    'obj': item
                                }

                                var text = $(required[i]).data('required');

                                if (text)
                                    response.text = text;

                                itens.push(response);
                            }
                        }

                        if (itens.length > 0) {
                            obj.target.required(itens);
                            return false;
                        }
                    }
                }

                if (obj.target.beforeNext() === false)
                    return;

                if (!obj.target.itens[obj.target.current.position + 1])
                    return;
                else
                    ++obj.target.current.position;

                $('.slide-form-item.center', obj.target).toggleClass('center left');
                obj.target.current.object = $(obj.target.itens[obj.target.current.position], obj.target);

                obj.target.current.name = obj.target.current.object.data('name') ? obj.target.current.object.data('name') : null;

                $(obj.target.current.object, obj.target).toggleClass('right center');
            },
            'prevSection': function () {
                if (obj.target.beforePrev() === false)
                    return;

                if (!obj.target.itens[obj.target.current.position - 1])
                    return;
                else
                    --obj.target.current.position;

                $('.slide-form-item.center', obj.target).toggleClass('center right');

                obj.target.current.object = $(obj.target.itens[obj.target.current.position], obj.target);

                obj.target.current.name = obj.target.current.object.data('name') ? obj.target.current.object.data('name') : null;

                obj.target.current.object.toggleClass('left center');
            },
            'status': function () {
                obj.status.addClass('show');

                var lis = obj.status.find('li');

                for (var i = 0; i < lis.length; i++) {
                    if (i <= obj.target.current.position)
                        $('i', lis[i]).addClass('fa-square').removeClass('fa-square-o');
                    else
                        $('i', lis[i]).removeClass('fa-square').addClass('fa-square-o');
                }

            },
            'review': function () {
                obj.target.toggleClass('review');

                if (obj.status)
                    obj.status.addClass('hide');
            },
            'prev': function () {
                obj.target.trigger('prevSection');
                return false;
            },
            'next': function () {
                if (obj.target.hasClass('review')) {
                    obj.target.toggleClass('review no-animate');
                    setTimeout(function () {
                        obj.target.removeClass('no-animate');
                    }, 100);
                }

                obj.target.trigger('nextSection');
                return false;
            },
            'selections': function () {
                var parent = $(this).parents('.slide-form-item'),
                    input = parent.find('input');

                if (!$(this).hasClass('active')) {
                    $('a.active', parent).removeClass('active');
                    $(input).val($(this).data('value') ? $(this).data('value') : $(this).text());
                    $(this).addClass('active');
                }
                else {
                    $(this).removeClass('active');
                    $(input).val('');
                }

                return false;
            },
            'result': function () {
                var result = {},
                    forms = obj.target.find('.slide-form-item').not('.only-review');

                for (var i = 0; i < forms.length; i++) {
                    var form = $(forms[i]).serializeArray();
                    if (form.length > 0)
                        for (var e = 0; e < form.length; e++)
                            result[form[e].name] = form[e].value;
                }

                obj.target.trigger('submit', result);

                return result;
            },
            'required': function (response) {
                var text = new Array();

                for(var i = 0; i < response.length; i++){
                    if(response[i].text);
                        text.push(response[i].text)
                }

                if(text.length > 0)
                    alert(text.join("\n"));
            },
            'beforeNext': function () {
            },
            'beforePrev': function () {
            }
        };

        if (customFn)
            $.extend(defaultFunctions, customFn);

        $.extend(obj.target, defaultFunctions);

        obj.target
            .on('nextSection init', obj.target.nextSection)
            .on('prevSection', obj.target.prevSection)
            .on('nextSection prevSection init', obj.target.status)
            .on('review', obj.target.review)
            .on('click', '.prev', obj.target.prev)
            .on('click', '.next', obj.target.next)
            .on('click', '.end', obj.target.end)
            .on('click', '.selections a', obj.target.selections)
            .on('click', '.send, .submit', obj.target.result);

        obj.target.addClass('slide-form');


        var status = $('<div>').addClass('status').append($('<ul>'));

        obj.target.append(status);
        obj.status = $('ul', status);

        for (var i = 0; i < obj.target.itens.length; i++) {
            $(obj.target.itens[i]).addClass('slide-form-item')
            obj.status.append($('<li>').html('<i class="fa fa-square-o"></i>'));
        }

        $('.slide-form-item', obj.target).addClass('right');
        $('.only-review').addClass('slide-form-item');
        obj.target.trigger('init');

        return obj.target;
    }
})(jQuery);
