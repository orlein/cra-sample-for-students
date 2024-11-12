export function validatePagination(pagination) {
  const result = {
    offset: 0,
    limit: 20,
  };

  if (
    !pagination?.offset ||
    typeof pagination?.offset !== "number" ||
    pagination.result < 0
  ) {
    result.offset = 0;
  } else {
    result.offset = pagination.offset;
  }

  if (
    !pagination?.limit ||
    typeof pagination?.limit !== "number" ||
    pagination.result < 0
  ) {
    result.limit = 20;
  } else {
    result.limit = 20;
  }

  return result;
}

/**
 *
 * @param {{ offset: number; limit: number }} pagination
 * @returns
 */
export async function fetchPokemon(pagination) {
  const { offset, limit } = validatePagination(pagination);

  const paginationUrlParams = new URLSearchParams({
    offset,
    limit,
  });

  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?${paginationUrlParams.toString()}`
    );

    const data = await res.json();

    // no error
    return data;
  } catch (error) {
    return {
      error: "An error occurred using fetch",
    };
  }
}
