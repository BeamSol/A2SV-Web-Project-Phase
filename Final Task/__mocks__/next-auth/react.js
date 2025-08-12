export const useSession = jest.fn(() => ({
  data: { accessToken: 'mock-token' },
  status: 'authenticated',
}));