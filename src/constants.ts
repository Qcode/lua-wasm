// Variables contain a 4 byte type and a 4 byte value
export const VAR_SIZE = 8;
// 4 bytes for dynamic link,
// 4 bytes for static link
// 4 bytes for total vars
export const FRAME_PROLOGUE_SIZE = 12;
// 8 bytes for key, 8 bytes for value
export const HASH_KVP_SIZE = 16;
// 4 bytes for load
// 4 bytes for array capacity
// 4 bytes - ptr to hash array of size (array capacity)
export const HASH_PROLOGUE_SIZE = 12;
