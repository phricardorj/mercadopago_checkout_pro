import mercadopago from "mercadopago";

const createPreference = async (orderNumber, items) => {
  const preference = {
    items,
    back_urls: {
      success: "https://phricardo.com.br/success",
      failure: "https://phricardo.com.br/failure",
      pending: "https://phricardo.com.br/pending",
    },
    auto_return: "approved",
    external_reference: orderNumber.toString(),
    statement_descriptor: "Descrição do Produto",
    installments: 12,
    default_payment_method_id: null,
    default_installments: null,
    notification_url: process.env.NOTIFICATION_URL,
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    const checkoutLink = response.body.init_point;
    return checkoutLink;
  } catch (error) {
    console.log(error);
    throw new Error(`Erro ao criar preferência. ${error}`);
  }
};

export default createPreference;
