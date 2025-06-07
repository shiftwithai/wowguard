import { supabase } from './supabase';

export async function uploadFile(file: File, path: string): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('vendor-portfolios')
      .upload(filePath, file);

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('vendor-portfolios')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error('File upload error:', error);
    return null;
  }
}

export async function uploadMultipleFiles(files: File[], path: string): Promise<string[]> {
  const uploadPromises = files.map(file => uploadFile(file, path));
  const results = await Promise.all(uploadPromises);
  return results.filter((url): url is string => url !== null);
}