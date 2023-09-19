export const checkUid = (uid: string | undefined): bool => {
	return uid && uid.length == 36;
};
