/**
 * DetalleFactura.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    descripcionFactura: {
      type: "json",
    },
    peso: {
      type: "json",
    },
    precioPorLibra: {
      type: "json",
    },
    cantidad: {
      type: "json",
    },
    subtotalPorPedido: {
      type: "json",
    },
    subtotal: {
      type: "number",
    },
    total: {
      type: "number",
    },
    fechaEntrega: {
      type: "string",
    },

    estado: {
      type: "string",
    },
    fechaCreacion: {
      type: "string",
    },
    nombreUsuarioCreacion: {
      type: "string",
    },
    fechaActualizacion: {
      type: "string",
    },
    nombreUsuarioActualizacion: {
      type: "string",
    },
    factura:{
      collection:'factura',
      via:'idDetalleFactura'
    }
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

