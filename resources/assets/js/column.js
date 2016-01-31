var Sequelize = require('sequelize');

module.exports = Vue.extend({
    template: view('column'),

    props: [
        'column',
        'columnIndex',
        'data',
    ],

    computed: {
        row: function() {
            return this.$parent.row;
        },

        rowIndex: function() {
            return this.$parent.rowIndex;
        },

        updating: function() {
            return this.$parent.updating;
        },

        model: function() {
            return this.$parent.model;
        },

        data: function() {
            return this.row[this.column];
        },

        type: function() {
            return this.model.attributes[this.column].type.key;
        },
    },

    filters: {
        limit: function(value, qty) {
            value = String(value);
            qty = qty || 50;

            if (value.length < qty) return value;

            return value.substr(0, qty) +  ' ...';
        }
    },

    methods: {
        modal: function() {
            return this.$parent.modal();
        },

        save: function() {
            return this.$parent.save();
        },

        isBigType: function() {
            return this.type == Sequelize.TEXT().key;
        },

        update: function() {
            this.updating.row = this.rowIndex;
            this.updating.column = this.columnIndex;
            this.updating.type = this.type;
            this.updating.value = this.row[this.column];

            if (this.isBigType()) {
                this.modal().open();
            }
        },

        isUpdating: function() {
            return this.rowIndex == this.$parent.updating.row && this.columnIndex == this.$parent.updating.column;
        },
    },
});