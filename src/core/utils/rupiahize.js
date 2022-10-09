const Rupiahize = (input) => {
  const number = input || 0;

  return number.toLocaleString('in-RP', {
    style: 'currency',
    currency: 'IDR',
  });
};

export default Rupiahize;
