export const handleColorType = (status) => {
  switch (status) {
    case 0: {
      return '#313337';
    }
    case 1:
    case 'success': {
      return 'rgb(33, 166, 122)';
    }
    case 2:
    case 'info': {
      return 'rgb(0, 82, 255)';
    }
    case 3:
    case 'warning': {
      return 'rgb(255, 162, 0)';
    }
    case 4:
    case 'error': {
      return 'rgb(239, 57, 52)';
    }
    case 'disabled': {
      return 'rgb(167, 172, 172)';
    }
    default: {
      return '#313337';
    }
  }
};
