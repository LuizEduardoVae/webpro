export const fetchHygraphQuery = async <T>(
  query: string,
  revalidate?: number,
): Promise<T> => {
  const response = await fetch(process.env.HYGRAPH_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    },
    next: {
      revalidate,
    },
    body: JSON.stringify({
      query,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Erro na requisição: ${response.status} - ${errorText}`);
    throw new Error(`Erro na requisição: ${response.statusText}`);
  }

  const { data, errors } = await response.json();

  if (errors) {
    console.error(`Erros da API: ${JSON.stringify(errors)}`);
    throw new Error(`Erro na API: ${JSON.stringify(errors)}`);
  }

  return data;
}