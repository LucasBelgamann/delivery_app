const formatCurrency = (value) => new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

module.exports = { formatCurrency };
