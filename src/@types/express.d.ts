declare namespace Express {
  export interface Request {
    user?:
      | Pick<
          import('../user/schemas/user.schema').UserDocument,
          '_id' | 'password'
        >
      | import('../user/schemas/user.schema').UserDocument;
  }
}
