import { useEffect, useState } from 'react';
import Text from '../../components/Text';
import api from '../../services/api';

function Dashboard() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    // api.get('/pokemon').then((response) => {
    //   setPokemon(response.data.results);
    // });
    async function getItems() {
      const { data } = await api.get('/pokemon');

      const resp = await Promise.all(data.results.map((item) => api.get(item.url)));
      const format = resp.map((req) => req.data);
      setPokemon(format);

      // for (const item of data.results) {
      //   const resp = await api.get(item.url);
      //   console.log('resp', resp);
      // }
    }

    getItems();
  }, []);

  return (
    <div>
      <Text as="h1">Dashboard</Text>
      <Text as="p">Search for Pokémon by name or using the National Pokédex number</Text>
      {
        pokemon.map((item) => (
          <div key={item.id}>
            {item.name}

            <img src={item.sprites.front_default} alt={item.name} />
          </div>
        ))
      }
    </div>
  );
}

export default Dashboard;
