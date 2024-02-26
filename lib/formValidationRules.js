export const addUpdatePostformValidationRules = [
    { field: 'userid', validator: (value) => typeof value === 'string' && value.trim() !== '', message: 'user id is required and must be a non-empty string.' },
    { field: 'commenttitle', validator: (value) => typeof value === 'string' && value.trim() !== '', message: 'title is required and must be a non-empty string.' },
    { field: 'comment', validator: (value) => typeof value === 'string' && value.trim() !== '', message: 'comment is required and must be a non-empty string.' },
  ];