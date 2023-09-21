import type { SupabaseClient } from '@supabase/supabase-js';
import imageCompression from 'browser-image-compression';
import { srcToWebP } from 'webp-converter-browser';

export const uploadListingPicture = async (
	supabase: SupabaseClient,
	files: FileList,
	listingUid: string
): Promise<string> => {
	const file = files[0];

	// since we can't transform an image without a pro-plan, let's compress it to hell
	const compressedImage = await imageCompression(file, {
		maxSizeMB: 2,
		maxWidthOrHeight: 640,
		useWebWorker: true
	});

	const webpBlob = await srcToWebP(URL.createObjectURL(compressedImage), {});

	const filePath = `${listingUid}.wepb`;
	const wepbFile = new File([webpBlob], filePath, { type: 'image/webp' });

	const { error } = await supabase.storage.from('listings').upload(filePath, wepbFile);

	if (error) throw error;

	return filePath;
};
