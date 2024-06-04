import { Box } from '../../core/interfaces/container.interface';
import baseApi from './baseApi';

// type AppType = {
//   id: string;
//   name: string;
//   icon: any;
//   isPublic: boolean;
//   isMaintenanceOn: boolean;
//   currentVersionId: string;
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
// };

// type RenameAppProps = {
//   appName: string;
//   appId: string;
// };

type fetchComponentsResponse = {
  appId: string;
  data: Box[];
};

export const componentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchComponents: build.query<Record<string, Box>, string>({
      query: (id) => {
        return {
          url: `components/allSaveComponents/${id}`,
          method: 'GET'
        };
      },
      transformResponse: (response: fetchComponentsResponse) => {
        console.log(response);
        const transformedResponse = response.data.reduce((map: Record<string, Box>, obj) => {
          map[obj.id] = { ...obj };
          return map;
        }, {});

        return transformedResponse;
      },
      providesTags: ['Components']
    }),
    saveComponents: build.mutation({
      query: ({ appId, data }) => {
        return {
          url: `components/app-save`,
          method: 'PUT',
          body: { appId, data }
        };
      }
    }),
    updateComponents: build.mutation({
      query: ({ id, componentId, data }) => {
        return {
          url: `components/${id}/${componentId}`,
          method: 'PATCH',
          body: data
        };
      }
      // invalidatesTags: ['Components']
    })
  })
});

export const {
  useFetchComponentsQuery,
  useUpdateComponentsMutation,
  useSaveComponentsMutation
} = componentApi;
