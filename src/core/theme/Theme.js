const Theme = () => {
  const colors = {
    header: '#00BECD',

    footer: '',

    badge: '#CE1111',

    accent: '#CCF2F5',

    background: 'white',

    textPrimary: '#000000',
    textSecondary: '#FFFFFF',
    textTertiary: '#B7B7B7',
    textQuaternary: '#00BECD',

    semanticError: '#CE1111',
    semanticSuccess: '#5CD523',

    brandPrimary: '#00BECD',
    brandSecondary: '#FFFFFF',
    brandTertiary: '#0E8A94',

    greyScale1: '#000000',
    greyScale2: '#B7B7B7',
    greyScale3: '#D6D6D6',
    greyScale4: '#F9F9F9',

    buttonActive: '#00BECD',
    buttonStandBy: '#FFFFFF',
    buttonDisabled: '#B7B7B7',

    backgroundTransparent1: '#00000033',
    backgroundTransparent2: '#B7B7B7CC',
  };

  const fontSize = {
    8: '8px',
    10: '10px',
    12: '12px',
    14: '14px',
    16: '16px',
    20: '20px',
    24: '24px',
  };

  return {
    colors,
    fontSize,
  };
};

export default Theme;
