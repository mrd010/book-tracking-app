import toast from 'react-hot-toast';

const colors = {
  destructive: 'hsl(0, 88%, 44%)',
  foreground: 'hsl(0 ,0% ,98%)',
};

export const toastError = (message: string) => {
  toast.error(message || 'Something went wrong.', {
    style: {
      backgroundColor: colors.destructive,
      color: colors.foreground,
    },
    position: 'bottom-center',
    iconTheme: {
      primary: colors.foreground,
      secondary: colors.destructive,
    },
  });
};

export const toastSuccess = (message: string) => {
  toast.success(message || 'Done.', {
    position: 'bottom-center',
  });
};
