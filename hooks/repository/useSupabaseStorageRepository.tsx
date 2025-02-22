import { supabase } from '@/lib/supabase';
import { useCallback } from 'react';

export type SupabaseStorageUploadResponse = {
  id: string;
  path: string;
  fullPath: string;
};

export const useSupabaseStorageRepository = () => {
  const getPublicUrl = useCallback((bucket: string, path: string): string => {
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(path);
    return publicUrl;
  }, []);

  const uploadToStorage = useCallback(
    async (
      bucket: string,
      path: string,
      fileBody: ArrayBuffer,
      contentType: string,
    ): Promise<SupabaseStorageUploadResponse> => {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, fileBody, { contentType });
      if (error || !data) throw error;

      return data;
    },
    [],
  );

  const deleteFromStorage = useCallback(
    async (bucket: string, path: string): Promise<void> => {
      const { data, error } = await supabase.storage
        .from(bucket)
        .remove([path]);
      if (!data?.length || error)
        console.error('Failed to remove old avatar:', error);
    },
    [],
  );

  return { getPublicUrl, uploadToStorage, deleteFromStorage };
};
