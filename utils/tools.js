import moment from "moment";

export const getShortAddress = (
  addressString = "",
  quantityLeave = 8,
  quantityTrim = 26
) => {
  const newAddressString = [...addressString];
  newAddressString.splice(quantityLeave, quantityTrim, " ", ".", ".", ".", " ");
  return newAddressString.join("");
};

export const getDate = (timestamp, format) => {
  if (format) {
    return moment.unix(timestamp).format(format);
  } else {
    return (
      moment
        .unix(timestamp)
        // .locale(config.ui.defaultLanguage)
        .format("DD.MM.YYYY")
    );
  }
};
