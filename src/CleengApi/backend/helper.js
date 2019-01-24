export const generateBody = (name, params) =>
  JSON.stringify([
    {
      method: name,
      params,
      jsonrpc: '2.0',
      id: 1,
    },
  ]);
