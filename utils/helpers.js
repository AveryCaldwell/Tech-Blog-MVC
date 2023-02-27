module.exports = {
    ifEquals: function (a, b, options) {
        if (a == b) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    ifNotEquals: function (a, b, options) {
        if (a !== b) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
            new Date(date).getFullYear() + 5
        }`;
    },
};
