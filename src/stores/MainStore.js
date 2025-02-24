import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { createClient } from "matrix-js-sdk";

export const useMainStore = defineStore('MainStore', () => {
  const client = ref(null);
  const isAuthenticated = ref(false);
  const rooms = ref([]);

  const login = async (homeserver, username, password) => {
    try {
      const authClient = createClient({ baseUrl: homeserver });

      const response = await authClient.login('m.login.password', {
        user: username,
        password: password,
      });

      const { user_id, access_token } = response;

      client.value = createClient({
        baseUrl: homeserver,
        accessToken: access_token,
        userId: user_id,
      });

      localStorage.setItem('matrix_access_token', access_token);
      localStorage.setItem('matrix_user_id', user_id);
      localStorage.setItem('matrix_homeserver', homeserver);

      isAuthenticated.value = true;
      await fetchRooms();
    } catch (error) {
      console.error('Login failed:', error);
      console.error('Error details:', error.response?.data);
    }
  };

  const fetchRooms = async () => {
    if (!client.value) return;
    await client.value.startClient({ initialSyncLimit: 10 });
    client.value.once('sync', (state) => {
      if (state === 'PREPARED') {
        rooms.value = client.value.getRooms();
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('matrix_access_token');
    localStorage.removeItem('matrix_user_id');
    localStorage.removeItem('matrix_homeserver');

    client.value = null;
    isAuthenticated.value = false;
    rooms.value = [];
  };

  return { client,
    isAuthenticated,
    rooms,
    login,
    logout,
    fetchRooms, }
})
