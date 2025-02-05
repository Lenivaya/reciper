import * as gqlTada from 'gql.tada'

/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
  AddCommentError: {
    kind: 'UNION'
    name: 'AddCommentError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  AddCommentInput: {
    kind: 'INPUT_OBJECT'
    name: 'AddCommentInput'
    isOneOf: false
    inputFields: [
      {
        name: 'createDto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'INPUT_OBJECT'
            name: 'CommentCreateDTOInput'
            ofType: null
          }
        }
        defaultValue: null
      }
    ]
  }
  AddCommentPayload: {
    kind: 'OBJECT'
    name: 'AddCommentPayload'
    fields: {
      comment: {
        name: 'comment'
        type: { kind: 'OBJECT'; name: 'Comment'; ofType: null }
      }
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'AddCommentError'; ofType: null }
          }
        }
      }
    }
  }
  AddIngredientError: {
    kind: 'UNION'
    name: 'AddIngredientError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  AddIngredientInput: {
    kind: 'INPUT_OBJECT'
    name: 'AddIngredientInput'
    isOneOf: false
    inputFields: [
      {
        name: 'createDto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'INPUT_OBJECT'
            name: 'IngredientCreateDTOInput'
            ofType: null
          }
        }
        defaultValue: null
      }
    ]
  }
  AddIngredientPayload: {
    kind: 'OBJECT'
    name: 'AddIngredientPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'AddIngredientError'; ofType: null }
          }
        }
      }
      ingredient: {
        name: 'ingredient'
        type: { kind: 'OBJECT'; name: 'Ingredient'; ofType: null }
      }
    }
  }
  AddRatingError: {
    kind: 'UNION'
    name: 'AddRatingError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  AddRatingInput: {
    kind: 'INPUT_OBJECT'
    name: 'AddRatingInput'
    isOneOf: false
    inputFields: [
      {
        name: 'createDto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'INPUT_OBJECT'
            name: 'RatingCreateDTOInput'
            ofType: null
          }
        }
        defaultValue: null
      }
    ]
  }
  AddRatingPayload: {
    kind: 'OBJECT'
    name: 'AddRatingPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'AddRatingError'; ofType: null }
          }
        }
      }
      rating: {
        name: 'rating'
        type: { kind: 'OBJECT'; name: 'Rating'; ofType: null }
      }
    }
  }
  AddRecipeError: {
    kind: 'UNION'
    name: 'AddRecipeError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  AddRecipeInput: {
    kind: 'INPUT_OBJECT'
    name: 'AddRecipeInput'
    isOneOf: false
    inputFields: [
      {
        name: 'createDto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'INPUT_OBJECT'
            name: 'RecipeCreateDTOInput'
            ofType: null
          }
        }
        defaultValue: null
      }
    ]
  }
  AddRecipePayload: {
    kind: 'OBJECT'
    name: 'AddRecipePayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'AddRecipeError'; ofType: null }
          }
        }
      }
      recipe: {
        name: 'recipe'
        type: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
      }
    }
  }
  AddRecipePhotoError: {
    kind: 'UNION'
    name: 'AddRecipePhotoError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  AddRecipePhotoInput: {
    kind: 'INPUT_OBJECT'
    name: 'AddRecipePhotoInput'
    isOneOf: false
    inputFields: [
      {
        name: 'recipeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'order'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'file'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Upload'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  AddRecipePhotoPayload: {
    kind: 'OBJECT'
    name: 'AddRecipePhotoPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'AddRecipePhotoError'; ofType: null }
          }
        }
      }
      recipe: {
        name: 'recipe'
        type: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
      }
    }
  }
  AddTagError: {
    kind: 'UNION'
    name: 'AddTagError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  AddTagInput: {
    kind: 'INPUT_OBJECT'
    name: 'AddTagInput'
    isOneOf: false
    inputFields: [
      {
        name: 'createDto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'INPUT_OBJECT'
            name: 'TagCreateDTOInput'
            ofType: null
          }
        }
        defaultValue: null
      }
    ]
  }
  AddTagPayload: {
    kind: 'OBJECT'
    name: 'AddTagPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'AddTagError'; ofType: null }
          }
        }
      }
      tag: { name: 'tag'; type: { kind: 'OBJECT'; name: 'Tag'; ofType: null } }
    }
  }
  ApplyPolicy: {
    name: 'ApplyPolicy'
    enumValues: 'BEFORE_RESOLVER' | 'AFTER_RESOLVER' | 'VALIDATION'
  }
  Boolean: unknown
  BooleanOperationFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'BooleanOperationFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'eq'
        type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        defaultValue: null
      },
      {
        name: 'neq'
        type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        defaultValue: null
      }
    ]
  }
  CollectionSegmentInfo: {
    kind: 'OBJECT'
    name: 'CollectionSegmentInfo'
    fields: {
      hasNextPage: {
        name: 'hasNextPage'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        }
      }
      hasPreviousPage: {
        name: 'hasPreviousPage'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        }
      }
    }
  }
  Comment: {
    kind: 'OBJECT'
    name: 'Comment'
    fields: {
      content: {
        name: 'content'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      createdAt: {
        name: 'createdAt'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
      }
      id: {
        name: 'id'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      recipe: {
        name: 'recipe'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
        }
      }
      recipeId: {
        name: 'recipeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      updatedAt: {
        name: 'updatedAt'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
      }
      user: {
        name: 'user'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'User'; ofType: null }
        }
      }
      userId: {
        name: 'userId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
    }
  }
  CommentCreateDTOInput: {
    kind: 'INPUT_OBJECT'
    name: 'CommentCreateDTOInput'
    isOneOf: false
    inputFields: [
      {
        name: 'recipeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'content'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  CommentFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'CommentFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'and'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'CommentFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'or'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'CommentFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'id'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'content'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'StringOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'createdAt'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'DateTimeOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'updatedAt'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'DateTimeOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'userId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'recipeId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'user'
        type: { kind: 'INPUT_OBJECT'; name: 'UserFilterInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'recipe'
        type: { kind: 'INPUT_OBJECT'; name: 'RecipeFilterInput'; ofType: null }
        defaultValue: null
      }
    ]
  }
  CommentPatchDTOInput: {
    kind: 'INPUT_OBJECT'
    name: 'CommentPatchDTOInput'
    isOneOf: false
    inputFields: [
      {
        name: 'content'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      }
    ]
  }
  CommentSortInput: {
    kind: 'INPUT_OBJECT'
    name: 'CommentSortInput'
    isOneOf: false
    inputFields: [
      {
        name: 'id'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'content'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'createdAt'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'updatedAt'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'userId'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'recipeId'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'user'
        type: { kind: 'INPUT_OBJECT'; name: 'UserSortInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'recipe'
        type: { kind: 'INPUT_OBJECT'; name: 'RecipeSortInput'; ofType: null }
        defaultValue: null
      }
    ]
  }
  CommentsCursorConnection: {
    kind: 'OBJECT'
    name: 'CommentsCursorConnection'
    fields: {
      edges: {
        name: 'edges'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'CommentsCursorEdge'; ofType: null }
          }
        }
      }
      nodes: {
        name: 'nodes'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'Comment'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'PageInfo'; ofType: null }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  CommentsCursorEdge: {
    kind: 'OBJECT'
    name: 'CommentsCursorEdge'
    fields: {
      cursor: {
        name: 'cursor'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      node: {
        name: 'node'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'Comment'; ofType: null }
        }
      }
    }
  }
  CommentsOffsetCollectionSegment: {
    kind: 'OBJECT'
    name: 'CommentsOffsetCollectionSegment'
    fields: {
      items: {
        name: 'items'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'Comment'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'CollectionSegmentInfo'
            ofType: null
          }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  DateTime: unknown
  DateTimeOperationFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'DateTimeOperationFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'eq'
        type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        defaultValue: null
      },
      {
        name: 'neq'
        type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        defaultValue: null
      },
      {
        name: 'in'
        type: {
          kind: 'LIST'
          name: never
          ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'nin'
        type: {
          kind: 'LIST'
          name: never
          ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'gt'
        type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        defaultValue: null
      },
      {
        name: 'ngt'
        type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        defaultValue: null
      },
      {
        name: 'gte'
        type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        defaultValue: null
      },
      {
        name: 'ngte'
        type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        defaultValue: null
      },
      {
        name: 'lt'
        type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        defaultValue: null
      },
      {
        name: 'nlt'
        type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        defaultValue: null
      },
      {
        name: 'lte'
        type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        defaultValue: null
      },
      {
        name: 'nlte'
        type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        defaultValue: null
      }
    ]
  }
  DeleteCommentByIdError: {
    kind: 'UNION'
    name: 'DeleteCommentByIdError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  DeleteCommentByIdInput: {
    kind: 'INPUT_OBJECT'
    name: 'DeleteCommentByIdInput'
    isOneOf: false
    inputFields: [
      {
        name: 'commentId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  DeleteCommentByIdPayload: {
    kind: 'OBJECT'
    name: 'DeleteCommentByIdPayload'
    fields: {
      comment: {
        name: 'comment'
        type: { kind: 'OBJECT'; name: 'Comment'; ofType: null }
      }
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'UNION'
              name: 'DeleteCommentByIdError'
              ofType: null
            }
          }
        }
      }
    }
  }
  DeleteIngredientByIdError: {
    kind: 'UNION'
    name: 'DeleteIngredientByIdError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  DeleteIngredientByIdInput: {
    kind: 'INPUT_OBJECT'
    name: 'DeleteIngredientByIdInput'
    isOneOf: false
    inputFields: [
      {
        name: 'ingredientId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  DeleteIngredientByIdPayload: {
    kind: 'OBJECT'
    name: 'DeleteIngredientByIdPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'UNION'
              name: 'DeleteIngredientByIdError'
              ofType: null
            }
          }
        }
      }
      ingredient: {
        name: 'ingredient'
        type: { kind: 'OBJECT'; name: 'Ingredient'; ofType: null }
      }
    }
  }
  DeleteLikeByIdError: {
    kind: 'UNION'
    name: 'DeleteLikeByIdError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  DeleteLikeByIdInput: {
    kind: 'INPUT_OBJECT'
    name: 'DeleteLikeByIdInput'
    isOneOf: false
    inputFields: [
      {
        name: 'likeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  DeleteLikeByIdPayload: {
    kind: 'OBJECT'
    name: 'DeleteLikeByIdPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'DeleteLikeByIdError'; ofType: null }
          }
        }
      }
      recipeLike: {
        name: 'recipeLike'
        type: { kind: 'OBJECT'; name: 'RecipeLike'; ofType: null }
      }
    }
  }
  DeleteRatingByIdError: {
    kind: 'UNION'
    name: 'DeleteRatingByIdError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  DeleteRatingByIdInput: {
    kind: 'INPUT_OBJECT'
    name: 'DeleteRatingByIdInput'
    isOneOf: false
    inputFields: [
      {
        name: 'ratingId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  DeleteRatingByIdPayload: {
    kind: 'OBJECT'
    name: 'DeleteRatingByIdPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'UNION'
              name: 'DeleteRatingByIdError'
              ofType: null
            }
          }
        }
      }
      rating: {
        name: 'rating'
        type: { kind: 'OBJECT'; name: 'Rating'; ofType: null }
      }
    }
  }
  DeleteRatingForRecipeError: {
    kind: 'UNION'
    name: 'DeleteRatingForRecipeError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  DeleteRatingForRecipeInput: {
    kind: 'INPUT_OBJECT'
    name: 'DeleteRatingForRecipeInput'
    isOneOf: false
    inputFields: [
      {
        name: 'recipeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  DeleteRatingForRecipePayload: {
    kind: 'OBJECT'
    name: 'DeleteRatingForRecipePayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'UNION'
              name: 'DeleteRatingForRecipeError'
              ofType: null
            }
          }
        }
      }
      rating: {
        name: 'rating'
        type: { kind: 'OBJECT'; name: 'Rating'; ofType: null }
      }
    }
  }
  DeleteRecipeByIdError: {
    kind: 'UNION'
    name: 'DeleteRecipeByIdError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  DeleteRecipeByIdInput: {
    kind: 'INPUT_OBJECT'
    name: 'DeleteRecipeByIdInput'
    isOneOf: false
    inputFields: [
      {
        name: 'recipeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  DeleteRecipeByIdPayload: {
    kind: 'OBJECT'
    name: 'DeleteRecipeByIdPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'UNION'
              name: 'DeleteRecipeByIdError'
              ofType: null
            }
          }
        }
      }
      recipe: {
        name: 'recipe'
        type: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
      }
    }
  }
  DeleteRecipePhotoError: {
    kind: 'UNION'
    name: 'DeleteRecipePhotoError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  DeleteRecipePhotoInput: {
    kind: 'INPUT_OBJECT'
    name: 'DeleteRecipePhotoInput'
    isOneOf: false
    inputFields: [
      {
        name: 'recipeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'photoId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  DeleteRecipePhotoPayload: {
    kind: 'OBJECT'
    name: 'DeleteRecipePhotoPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'UNION'
              name: 'DeleteRecipePhotoError'
              ofType: null
            }
          }
        }
      }
      recipeImage: {
        name: 'recipeImage'
        type: { kind: 'OBJECT'; name: 'RecipeImage'; ofType: null }
      }
    }
  }
  DeleteSubscriptionByIdError: {
    kind: 'UNION'
    name: 'DeleteSubscriptionByIdError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  DeleteSubscriptionByIdInput: {
    kind: 'INPUT_OBJECT'
    name: 'DeleteSubscriptionByIdInput'
    isOneOf: false
    inputFields: [
      {
        name: 'subscriptionId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  DeleteSubscriptionByIdPayload: {
    kind: 'OBJECT'
    name: 'DeleteSubscriptionByIdPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'UNION'
              name: 'DeleteSubscriptionByIdError'
              ofType: null
            }
          }
        }
      }
      userSubscription: {
        name: 'userSubscription'
        type: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
      }
    }
  }
  DeleteTagByIdError: {
    kind: 'UNION'
    name: 'DeleteTagByIdError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  DeleteTagByIdInput: {
    kind: 'INPUT_OBJECT'
    name: 'DeleteTagByIdInput'
    isOneOf: false
    inputFields: [
      {
        name: 'tagId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  DeleteTagByIdPayload: {
    kind: 'OBJECT'
    name: 'DeleteTagByIdPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'DeleteTagByIdError'; ofType: null }
          }
        }
      }
      tag: { name: 'tag'; type: { kind: 'OBJECT'; name: 'Tag'; ofType: null } }
    }
  }
  DeleteUserPayload: {
    kind: 'OBJECT'
    name: 'DeleteUserPayload'
    fields: {
      user: {
        name: 'user'
        type: { kind: 'OBJECT'; name: 'User'; ofType: null }
      }
    }
  }
  DifficultyLevel: {
    name: 'DifficultyLevel'
    enumValues: 'BEGINNER' | 'EASY' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
  }
  DifficultyLevelOperationFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'DifficultyLevelOperationFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'eq'
        type: { kind: 'ENUM'; name: 'DifficultyLevel'; ofType: null }
        defaultValue: null
      },
      {
        name: 'neq'
        type: { kind: 'ENUM'; name: 'DifficultyLevel'; ofType: null }
        defaultValue: null
      },
      {
        name: 'in'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'ENUM'; name: 'DifficultyLevel'; ofType: null }
          }
        }
        defaultValue: null
      },
      {
        name: 'nin'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'ENUM'; name: 'DifficultyLevel'; ofType: null }
          }
        }
        defaultValue: null
      }
    ]
  }
  Error: {
    kind: 'INTERFACE'
    name: 'Error'
    fields: {
      message: {
        name: 'message'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
    }
    possibleTypes: 'ReciperError'
  }
  Float: unknown
  Ingredient: {
    kind: 'OBJECT'
    name: 'Ingredient'
    fields: {
      id: {
        name: 'id'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      name: {
        name: 'name'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      recipeIngredients: {
        name: 'recipeIngredients'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'OBJECT'; name: 'RecipeIngredient'; ofType: null }
            }
          }
        }
      }
    }
  }
  IngredientCreateDTOInput: {
    kind: 'INPUT_OBJECT'
    name: 'IngredientCreateDTOInput'
    isOneOf: false
    inputFields: [
      {
        name: 'name'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  IngredientFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'IngredientFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'and'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'IngredientFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'or'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'IngredientFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'id'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'name'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'StringOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'recipeIngredients'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'ListFilterInputTypeOfRecipeIngredientFilterInput'
          ofType: null
        }
        defaultValue: null
      }
    ]
  }
  IngredientPatchDTOInput: {
    kind: 'INPUT_OBJECT'
    name: 'IngredientPatchDTOInput'
    isOneOf: false
    inputFields: [
      {
        name: 'name'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      }
    ]
  }
  IngredientSearchCriteriaInput: {
    kind: 'INPUT_OBJECT'
    name: 'IngredientSearchCriteriaInput'
    isOneOf: false
    inputFields: [
      {
        name: 'overallMatching'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      }
    ]
  }
  IngredientSortInput: {
    kind: 'INPUT_OBJECT'
    name: 'IngredientSortInput'
    isOneOf: false
    inputFields: [
      {
        name: 'id'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'name'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      }
    ]
  }
  IngredientsCursorConnection: {
    kind: 'OBJECT'
    name: 'IngredientsCursorConnection'
    fields: {
      edges: {
        name: 'edges'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'OBJECT'
              name: 'IngredientsCursorEdge'
              ofType: null
            }
          }
        }
      }
      nodes: {
        name: 'nodes'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'Ingredient'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'PageInfo'; ofType: null }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  IngredientsCursorEdge: {
    kind: 'OBJECT'
    name: 'IngredientsCursorEdge'
    fields: {
      cursor: {
        name: 'cursor'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      node: {
        name: 'node'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'Ingredient'; ofType: null }
        }
      }
    }
  }
  IngredientsOffsetCollectionSegment: {
    kind: 'OBJECT'
    name: 'IngredientsOffsetCollectionSegment'
    fields: {
      items: {
        name: 'items'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'Ingredient'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'CollectionSegmentInfo'
            ofType: null
          }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  Int: unknown
  IntOperationFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'IntOperationFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'eq'
        type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        defaultValue: null
      },
      {
        name: 'neq'
        type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        defaultValue: null
      },
      {
        name: 'in'
        type: {
          kind: 'LIST'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'nin'
        type: {
          kind: 'LIST'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'gt'
        type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        defaultValue: null
      },
      {
        name: 'ngt'
        type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        defaultValue: null
      },
      {
        name: 'gte'
        type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        defaultValue: null
      },
      {
        name: 'ngte'
        type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        defaultValue: null
      },
      {
        name: 'lt'
        type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        defaultValue: null
      },
      {
        name: 'nlt'
        type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        defaultValue: null
      },
      {
        name: 'lte'
        type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        defaultValue: null
      },
      {
        name: 'nlte'
        type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        defaultValue: null
      }
    ]
  }
  LikeRecipeError: {
    kind: 'UNION'
    name: 'LikeRecipeError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  LikeRecipeInput: {
    kind: 'INPUT_OBJECT'
    name: 'LikeRecipeInput'
    isOneOf: false
    inputFields: [
      {
        name: 'recipeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  LikeRecipePayload: {
    kind: 'OBJECT'
    name: 'LikeRecipePayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'LikeRecipeError'; ofType: null }
          }
        }
      }
      recipeLike: {
        name: 'recipeLike'
        type: { kind: 'OBJECT'; name: 'RecipeLike'; ofType: null }
      }
    }
  }
  ListFilterInputTypeOfCommentFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'ListFilterInputTypeOfCommentFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'all'
        type: { kind: 'INPUT_OBJECT'; name: 'CommentFilterInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'none'
        type: { kind: 'INPUT_OBJECT'; name: 'CommentFilterInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'some'
        type: { kind: 'INPUT_OBJECT'; name: 'CommentFilterInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'any'
        type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        defaultValue: null
      }
    ]
  }
  ListFilterInputTypeOfRatingFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'ListFilterInputTypeOfRatingFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'all'
        type: { kind: 'INPUT_OBJECT'; name: 'RatingFilterInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'none'
        type: { kind: 'INPUT_OBJECT'; name: 'RatingFilterInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'some'
        type: { kind: 'INPUT_OBJECT'; name: 'RatingFilterInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'any'
        type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        defaultValue: null
      }
    ]
  }
  ListFilterInputTypeOfRecipeFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'ListFilterInputTypeOfRecipeFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'all'
        type: { kind: 'INPUT_OBJECT'; name: 'RecipeFilterInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'none'
        type: { kind: 'INPUT_OBJECT'; name: 'RecipeFilterInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'some'
        type: { kind: 'INPUT_OBJECT'; name: 'RecipeFilterInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'any'
        type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        defaultValue: null
      }
    ]
  }
  ListFilterInputTypeOfRecipeImageFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'ListFilterInputTypeOfRecipeImageFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'all'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'RecipeImageFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'none'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'RecipeImageFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'some'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'RecipeImageFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'any'
        type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        defaultValue: null
      }
    ]
  }
  ListFilterInputTypeOfRecipeIngredientFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'ListFilterInputTypeOfRecipeIngredientFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'all'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'RecipeIngredientFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'none'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'RecipeIngredientFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'some'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'RecipeIngredientFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'any'
        type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        defaultValue: null
      }
    ]
  }
  ListFilterInputTypeOfRecipeLikeFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'ListFilterInputTypeOfRecipeLikeFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'all'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'RecipeLikeFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'none'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'RecipeLikeFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'some'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'RecipeLikeFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'any'
        type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        defaultValue: null
      }
    ]
  }
  ListFilterInputTypeOfRecipeTagFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'ListFilterInputTypeOfRecipeTagFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'all'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'RecipeTagFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'none'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'RecipeTagFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'some'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'RecipeTagFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'any'
        type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        defaultValue: null
      }
    ]
  }
  ListFilterInputTypeOfUserImageFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'ListFilterInputTypeOfUserImageFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'all'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UserImageFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'none'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UserImageFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'some'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UserImageFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'any'
        type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        defaultValue: null
      }
    ]
  }
  ListFilterInputTypeOfUserRoleFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'ListFilterInputTypeOfUserRoleFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'all'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UserRoleFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'none'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UserRoleFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'some'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UserRoleFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'any'
        type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        defaultValue: null
      }
    ]
  }
  ListFilterInputTypeOfUserSubscriptionFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'ListFilterInputTypeOfUserSubscriptionFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'all'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UserSubscriptionFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'none'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UserSubscriptionFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'some'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UserSubscriptionFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'any'
        type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        defaultValue: null
      }
    ]
  }
  LoginDTOInput: {
    kind: 'INPUT_OBJECT'
    name: 'LoginDTOInput'
    isOneOf: false
    inputFields: [
      {
        name: 'login'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'password'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  LoginUserError: {
    kind: 'UNION'
    name: 'LoginUserError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  LoginUserInput: {
    kind: 'INPUT_OBJECT'
    name: 'LoginUserInput'
    isOneOf: false
    inputFields: [
      {
        name: 'loginDto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'INPUT_OBJECT'; name: 'LoginDTOInput'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  LoginUserPayload: {
    kind: 'OBJECT'
    name: 'LoginUserPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'LoginUserError'; ofType: null }
          }
        }
      }
      userLoginPayload: {
        name: 'userLoginPayload'
        type: { kind: 'OBJECT'; name: 'UserLoginPayload'; ofType: null }
      }
    }
  }
  Mutation: {
    kind: 'OBJECT'
    name: 'Mutation'
    fields: {
      addComment: {
        name: 'addComment'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'AddCommentPayload'; ofType: null }
        }
      }
      addIngredient: {
        name: 'addIngredient'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'AddIngredientPayload'; ofType: null }
        }
      }
      addRating: {
        name: 'addRating'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'AddRatingPayload'; ofType: null }
        }
      }
      addRecipe: {
        name: 'addRecipe'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'AddRecipePayload'; ofType: null }
        }
      }
      addRecipePhoto: {
        name: 'addRecipePhoto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'AddRecipePhotoPayload'
            ofType: null
          }
        }
      }
      addTag: {
        name: 'addTag'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'AddTagPayload'; ofType: null }
        }
      }
      deleteCommentById: {
        name: 'deleteCommentById'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'DeleteCommentByIdPayload'
            ofType: null
          }
        }
      }
      deleteIngredientById: {
        name: 'deleteIngredientById'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'DeleteIngredientByIdPayload'
            ofType: null
          }
        }
      }
      deleteLikeById: {
        name: 'deleteLikeById'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'DeleteLikeByIdPayload'
            ofType: null
          }
        }
      }
      deleteRatingById: {
        name: 'deleteRatingById'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'DeleteRatingByIdPayload'
            ofType: null
          }
        }
      }
      deleteRatingForRecipe: {
        name: 'deleteRatingForRecipe'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'DeleteRatingForRecipePayload'
            ofType: null
          }
        }
      }
      deleteRecipeById: {
        name: 'deleteRecipeById'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'DeleteRecipeByIdPayload'
            ofType: null
          }
        }
      }
      deleteRecipePhoto: {
        name: 'deleteRecipePhoto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'DeleteRecipePhotoPayload'
            ofType: null
          }
        }
      }
      deleteSubscriptionById: {
        name: 'deleteSubscriptionById'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'DeleteSubscriptionByIdPayload'
            ofType: null
          }
        }
      }
      deleteTagById: {
        name: 'deleteTagById'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'DeleteTagByIdPayload'; ofType: null }
        }
      }
      deleteUser: {
        name: 'deleteUser'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'DeleteUserPayload'; ofType: null }
        }
      }
      likeRecipe: {
        name: 'likeRecipe'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'LikeRecipePayload'; ofType: null }
        }
      }
      loginUser: {
        name: 'loginUser'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'LoginUserPayload'; ofType: null }
        }
      }
      registerUser: {
        name: 'registerUser'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'RegisterUserPayload'; ofType: null }
        }
      }
      subscribe: {
        name: 'subscribe'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'SubscribePayload'; ofType: null }
        }
      }
      unlikeRecipe: {
        name: 'unlikeRecipe'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'UnlikeRecipePayload'; ofType: null }
        }
      }
      unsubscribe: {
        name: 'unsubscribe'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'UnsubscribePayload'; ofType: null }
        }
      }
      updateComment: {
        name: 'updateComment'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'UpdateCommentPayload'; ofType: null }
        }
      }
      updateIngredient: {
        name: 'updateIngredient'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'UpdateIngredientPayload'
            ofType: null
          }
        }
      }
      updateRatingById: {
        name: 'updateRatingById'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'UpdateRatingByIdPayload'
            ofType: null
          }
        }
      }
      updateRatingForRecipe: {
        name: 'updateRatingForRecipe'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'UpdateRatingForRecipePayload'
            ofType: null
          }
        }
      }
      updateRecipe: {
        name: 'updateRecipe'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'UpdateRecipePayload'; ofType: null }
        }
      }
      updateTag: {
        name: 'updateTag'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'UpdateTagPayload'; ofType: null }
        }
      }
      updateUser: {
        name: 'updateUser'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'UpdateUserPayload'; ofType: null }
        }
      }
      updateUserProfilePhoto: {
        name: 'updateUserProfilePhoto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'UpdateUserProfilePhotoPayload'
            ofType: null
          }
        }
      }
      upsertRecipeRating: {
        name: 'upsertRecipeRating'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'UpsertRecipeRatingPayload'
            ofType: null
          }
        }
      }
    }
  }
  MyRecipesCursorConnection: {
    kind: 'OBJECT'
    name: 'MyRecipesCursorConnection'
    fields: {
      edges: {
        name: 'edges'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'OBJECT'
              name: 'MyRecipesCursorEdge'
              ofType: null
            }
          }
        }
      }
      nodes: {
        name: 'nodes'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'PageInfo'; ofType: null }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  MyRecipesCursorEdge: {
    kind: 'OBJECT'
    name: 'MyRecipesCursorEdge'
    fields: {
      cursor: {
        name: 'cursor'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      node: {
        name: 'node'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
        }
      }
    }
  }
  MyRecipesOffsetCollectionSegment: {
    kind: 'OBJECT'
    name: 'MyRecipesOffsetCollectionSegment'
    fields: {
      items: {
        name: 'items'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'CollectionSegmentInfo'
            ofType: null
          }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  MySavedRecipesOffsetCollectionSegment: {
    kind: 'OBJECT'
    name: 'MySavedRecipesOffsetCollectionSegment'
    fields: {
      items: {
        name: 'items'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'CollectionSegmentInfo'
            ofType: null
          }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  MySubscribersCursorConnection: {
    kind: 'OBJECT'
    name: 'MySubscribersCursorConnection'
    fields: {
      edges: {
        name: 'edges'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'OBJECT'
              name: 'MySubscribersCursorEdge'
              ofType: null
            }
          }
        }
      }
      nodes: {
        name: 'nodes'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'PageInfo'; ofType: null }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  MySubscribersCursorEdge: {
    kind: 'OBJECT'
    name: 'MySubscribersCursorEdge'
    fields: {
      cursor: {
        name: 'cursor'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      node: {
        name: 'node'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
        }
      }
    }
  }
  MySubscribersOffsetCollectionSegment: {
    kind: 'OBJECT'
    name: 'MySubscribersOffsetCollectionSegment'
    fields: {
      items: {
        name: 'items'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'CollectionSegmentInfo'
            ofType: null
          }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  MySubscriptionsCursorConnection: {
    kind: 'OBJECT'
    name: 'MySubscriptionsCursorConnection'
    fields: {
      edges: {
        name: 'edges'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'OBJECT'
              name: 'MySubscriptionsCursorEdge'
              ofType: null
            }
          }
        }
      }
      nodes: {
        name: 'nodes'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'PageInfo'; ofType: null }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  MySubscriptionsCursorEdge: {
    kind: 'OBJECT'
    name: 'MySubscriptionsCursorEdge'
    fields: {
      cursor: {
        name: 'cursor'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      node: {
        name: 'node'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
        }
      }
    }
  }
  MySubscriptionsOffsetCollectionSegment: {
    kind: 'OBJECT'
    name: 'MySubscriptionsOffsetCollectionSegment'
    fields: {
      items: {
        name: 'items'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'CollectionSegmentInfo'
            ofType: null
          }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  PageInfo: {
    kind: 'OBJECT'
    name: 'PageInfo'
    fields: {
      endCursor: {
        name: 'endCursor'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
      }
      hasNextPage: {
        name: 'hasNextPage'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        }
      }
      hasPreviousPage: {
        name: 'hasPreviousPage'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        }
      }
      startCursor: {
        name: 'startCursor'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
      }
    }
  }
  Query: {
    kind: 'OBJECT'
    name: 'Query'
    fields: {
      commentById: {
        name: 'commentById'
        type: { kind: 'OBJECT'; name: 'Comment'; ofType: null }
      }
      commentsCursor: {
        name: 'commentsCursor'
        type: { kind: 'OBJECT'; name: 'CommentsCursorConnection'; ofType: null }
      }
      commentsOffset: {
        name: 'commentsOffset'
        type: {
          kind: 'OBJECT'
          name: 'CommentsOffsetCollectionSegment'
          ofType: null
        }
      }
      ingredientById: {
        name: 'ingredientById'
        type: { kind: 'OBJECT'; name: 'Ingredient'; ofType: null }
      }
      ingredientsCursor: {
        name: 'ingredientsCursor'
        type: {
          kind: 'OBJECT'
          name: 'IngredientsCursorConnection'
          ofType: null
        }
      }
      ingredientsOffset: {
        name: 'ingredientsOffset'
        type: {
          kind: 'OBJECT'
          name: 'IngredientsOffsetCollectionSegment'
          ofType: null
        }
      }
      likeById: {
        name: 'likeById'
        type: { kind: 'OBJECT'; name: 'RecipeLike'; ofType: null }
      }
      me: { name: 'me'; type: { kind: 'OBJECT'; name: 'User'; ofType: null } }
      myRecipeLike: {
        name: 'myRecipeLike'
        type: { kind: 'OBJECT'; name: 'RecipeLike'; ofType: null }
      }
      myRecipesCursor: {
        name: 'myRecipesCursor'
        type: {
          kind: 'OBJECT'
          name: 'MyRecipesCursorConnection'
          ofType: null
        }
      }
      myRecipesOffset: {
        name: 'myRecipesOffset'
        type: {
          kind: 'OBJECT'
          name: 'MyRecipesOffsetCollectionSegment'
          ofType: null
        }
      }
      mySavedRecipesOffset: {
        name: 'mySavedRecipesOffset'
        type: {
          kind: 'OBJECT'
          name: 'MySavedRecipesOffsetCollectionSegment'
          ofType: null
        }
      }
      mySubscribersCursor: {
        name: 'mySubscribersCursor'
        type: {
          kind: 'OBJECT'
          name: 'MySubscribersCursorConnection'
          ofType: null
        }
      }
      mySubscribersOffset: {
        name: 'mySubscribersOffset'
        type: {
          kind: 'OBJECT'
          name: 'MySubscribersOffsetCollectionSegment'
          ofType: null
        }
      }
      mySubscription: {
        name: 'mySubscription'
        type: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
      }
      mySubscriptionsCursor: {
        name: 'mySubscriptionsCursor'
        type: {
          kind: 'OBJECT'
          name: 'MySubscriptionsCursorConnection'
          ofType: null
        }
      }
      mySubscriptionsOffset: {
        name: 'mySubscriptionsOffset'
        type: {
          kind: 'OBJECT'
          name: 'MySubscriptionsOffsetCollectionSegment'
          ofType: null
        }
      }
      ratingByCompositeKey: {
        name: 'ratingByCompositeKey'
        type: { kind: 'OBJECT'; name: 'Rating'; ofType: null }
      }
      ratingById: {
        name: 'ratingById'
        type: { kind: 'OBJECT'; name: 'Rating'; ofType: null }
      }
      ratingsCursor: {
        name: 'ratingsCursor'
        type: { kind: 'OBJECT'; name: 'RatingsCursorConnection'; ofType: null }
      }
      ratingsOffset: {
        name: 'ratingsOffset'
        type: {
          kind: 'OBJECT'
          name: 'RatingsOffsetCollectionSegment'
          ofType: null
        }
      }
      recipeById: {
        name: 'recipeById'
        type: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
      }
      recipeLikesCursor: {
        name: 'recipeLikesCursor'
        type: {
          kind: 'OBJECT'
          name: 'RecipeLikesCursorConnection'
          ofType: null
        }
      }
      recipeLikesOffset: {
        name: 'recipeLikesOffset'
        type: {
          kind: 'OBJECT'
          name: 'RecipeLikesOffsetCollectionSegment'
          ofType: null
        }
      }
      recipeRating: {
        name: 'recipeRating'
        type: { kind: 'OBJECT'; name: 'Rating'; ofType: null }
      }
      recipesCursor: {
        name: 'recipesCursor'
        type: { kind: 'OBJECT'; name: 'RecipesCursorConnection'; ofType: null }
      }
      recipesOffset: {
        name: 'recipesOffset'
        type: {
          kind: 'OBJECT'
          name: 'RecipesOffsetCollectionSegment'
          ofType: null
        }
      }
      subscribersCursor: {
        name: 'subscribersCursor'
        type: {
          kind: 'OBJECT'
          name: 'SubscribersCursorConnection'
          ofType: null
        }
      }
      subscribersOffset: {
        name: 'subscribersOffset'
        type: {
          kind: 'OBJECT'
          name: 'SubscribersOffsetCollectionSegment'
          ofType: null
        }
      }
      subscriptionByCompositeKey: {
        name: 'subscriptionByCompositeKey'
        type: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
      }
      subscriptionById: {
        name: 'subscriptionById'
        type: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
      }
      subscriptionsCursor: {
        name: 'subscriptionsCursor'
        type: {
          kind: 'OBJECT'
          name: 'SubscriptionsCursorConnection'
          ofType: null
        }
      }
      subscriptionsOffset: {
        name: 'subscriptionsOffset'
        type: {
          kind: 'OBJECT'
          name: 'SubscriptionsOffsetCollectionSegment'
          ofType: null
        }
      }
      tagById: {
        name: 'tagById'
        type: { kind: 'OBJECT'; name: 'Tag'; ofType: null }
      }
      tagsCursor: {
        name: 'tagsCursor'
        type: { kind: 'OBJECT'; name: 'TagsCursorConnection'; ofType: null }
      }
      tagsOffset: {
        name: 'tagsOffset'
        type: {
          kind: 'OBJECT'
          name: 'TagsOffsetCollectionSegment'
          ofType: null
        }
      }
      userById: {
        name: 'userById'
        type: { kind: 'OBJECT'; name: 'User'; ofType: null }
      }
      userLikesCursor: {
        name: 'userLikesCursor'
        type: {
          kind: 'OBJECT'
          name: 'UserLikesCursorConnection'
          ofType: null
        }
      }
      userLikesOffset: {
        name: 'userLikesOffset'
        type: {
          kind: 'OBJECT'
          name: 'UserLikesOffsetCollectionSegment'
          ofType: null
        }
      }
      usersCursor: {
        name: 'usersCursor'
        type: { kind: 'OBJECT'; name: 'UsersCursorConnection'; ofType: null }
      }
      usersOffset: {
        name: 'usersOffset'
        type: {
          kind: 'OBJECT'
          name: 'UsersOffsetCollectionSegment'
          ofType: null
        }
      }
    }
  }
  Rating: {
    kind: 'OBJECT'
    name: 'Rating'
    fields: {
      createdAt: {
        name: 'createdAt'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
      }
      id: {
        name: 'id'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      recipe: {
        name: 'recipe'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
        }
      }
      recipeId: {
        name: 'recipeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      updatedAt: {
        name: 'updatedAt'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
      }
      user: {
        name: 'user'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'User'; ofType: null }
        }
      }
      userId: {
        name: 'userId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      value: {
        name: 'value'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  RatingCreateDTOInput: {
    kind: 'INPUT_OBJECT'
    name: 'RatingCreateDTOInput'
    isOneOf: false
    inputFields: [
      {
        name: 'recipeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'value'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  RatingFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'RatingFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'and'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'RatingFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'or'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'RatingFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'id'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'value'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'IntOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'createdAt'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'DateTimeOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'updatedAt'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'DateTimeOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'userId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'recipeId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'user'
        type: { kind: 'INPUT_OBJECT'; name: 'UserFilterInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'recipe'
        type: { kind: 'INPUT_OBJECT'; name: 'RecipeFilterInput'; ofType: null }
        defaultValue: null
      }
    ]
  }
  RatingPatchDTOInput: {
    kind: 'INPUT_OBJECT'
    name: 'RatingPatchDTOInput'
    isOneOf: false
    inputFields: [
      {
        name: 'value'
        type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        defaultValue: null
      }
    ]
  }
  RatingSortInput: {
    kind: 'INPUT_OBJECT'
    name: 'RatingSortInput'
    isOneOf: false
    inputFields: [
      {
        name: 'id'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'value'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'createdAt'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'updatedAt'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'userId'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'recipeId'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'user'
        type: { kind: 'INPUT_OBJECT'; name: 'UserSortInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'recipe'
        type: { kind: 'INPUT_OBJECT'; name: 'RecipeSortInput'; ofType: null }
        defaultValue: null
      }
    ]
  }
  RatingsCursorConnection: {
    kind: 'OBJECT'
    name: 'RatingsCursorConnection'
    fields: {
      edges: {
        name: 'edges'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'RatingsCursorEdge'; ofType: null }
          }
        }
      }
      nodes: {
        name: 'nodes'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'Rating'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'PageInfo'; ofType: null }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  RatingsCursorEdge: {
    kind: 'OBJECT'
    name: 'RatingsCursorEdge'
    fields: {
      cursor: {
        name: 'cursor'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      node: {
        name: 'node'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'Rating'; ofType: null }
        }
      }
    }
  }
  RatingsOffsetCollectionSegment: {
    kind: 'OBJECT'
    name: 'RatingsOffsetCollectionSegment'
    fields: {
      items: {
        name: 'items'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'Rating'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'CollectionSegmentInfo'
            ofType: null
          }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  Recipe: {
    kind: 'OBJECT'
    name: 'Recipe'
    fields: {
      averageRating: {
        name: 'averageRating'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null }
        }
      }
      comments: {
        name: 'comments'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'OBJECT'; name: 'Comment'; ofType: null }
            }
          }
        }
      }
      cookingTimeMinutes: {
        name: 'cookingTimeMinutes'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
      createdAt: {
        name: 'createdAt'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
      }
      description: {
        name: 'description'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      difficultyLevel: {
        name: 'difficultyLevel'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'ENUM'; name: 'DifficultyLevel'; ofType: null }
        }
      }
      id: {
        name: 'id'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      images: {
        name: 'images'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'OBJECT'; name: 'RecipeImage'; ofType: null }
            }
          }
        }
      }
      instructions: {
        name: 'instructions'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      likes: {
        name: 'likes'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'OBJECT'; name: 'RecipeLike'; ofType: null }
            }
          }
        }
      }
      likesCount: {
        name: 'likesCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
      ratings: {
        name: 'ratings'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'OBJECT'; name: 'Rating'; ofType: null }
            }
          }
        }
      }
      recipeIngredients: {
        name: 'recipeIngredients'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'OBJECT'; name: 'RecipeIngredient'; ofType: null }
            }
          }
        }
      }
      recipeTags: {
        name: 'recipeTags'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'OBJECT'; name: 'RecipeTag'; ofType: null }
            }
          }
        }
      }
      title: {
        name: 'title'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      updatedAt: {
        name: 'updatedAt'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
      }
      user: {
        name: 'user'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'User'; ofType: null }
        }
      }
      userId: {
        name: 'userId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
    }
  }
  RecipeCreateDTOInput: {
    kind: 'INPUT_OBJECT'
    name: 'RecipeCreateDTOInput'
    isOneOf: false
    inputFields: [
      {
        name: 'title'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'description'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'instructions'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'cookingTimeMinutes'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'difficultyLevel'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'ENUM'; name: 'DifficultyLevel'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'tags'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'ingredients'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: {
                kind: 'INPUT_OBJECT'
                name: 'RecipeCreateIngredientDTOInput'
                ofType: null
              }
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'images'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
            }
          }
        }
        defaultValue: null
      }
    ]
  }
  RecipeCreateIngredientDTOInput: {
    kind: 'INPUT_OBJECT'
    name: 'RecipeCreateIngredientDTOInput'
    isOneOf: false
    inputFields: [
      {
        name: 'amount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'ingredientId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  RecipeFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'RecipeFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'and'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'RecipeFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'or'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'RecipeFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'id'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'title'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'StringOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'description'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'StringOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'instructions'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'StringOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'cookingTimeMinutes'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'IntOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'difficultyLevel'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'DifficultyLevelOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'createdAt'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'DateTimeOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'updatedAt'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'DateTimeOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'userId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'user'
        type: { kind: 'INPUT_OBJECT'; name: 'UserFilterInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'recipeIngredients'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'ListFilterInputTypeOfRecipeIngredientFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'recipeTags'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'ListFilterInputTypeOfRecipeTagFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'images'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'ListFilterInputTypeOfRecipeImageFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'comments'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'ListFilterInputTypeOfCommentFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'ratings'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'ListFilterInputTypeOfRatingFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'likes'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'ListFilterInputTypeOfRecipeLikeFilterInput'
          ofType: null
        }
        defaultValue: null
      }
    ]
  }
  RecipeImage: {
    kind: 'OBJECT'
    name: 'RecipeImage'
    fields: {
      createdAt: {
        name: 'createdAt'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
      }
      id: {
        name: 'id'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      order: {
        name: 'order'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
      publicId: {
        name: 'publicId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      recipe: {
        name: 'recipe'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
        }
      }
      recipeId: {
        name: 'recipeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      url: {
        name: 'url'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
    }
  }
  RecipeImageFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'RecipeImageFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'and'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'RecipeImageFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'or'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'RecipeImageFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'id'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'publicId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'StringOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'url'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'StringOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'order'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'IntOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'recipeId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'createdAt'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'DateTimeOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'recipe'
        type: { kind: 'INPUT_OBJECT'; name: 'RecipeFilterInput'; ofType: null }
        defaultValue: null
      }
    ]
  }
  RecipeIngredient: {
    kind: 'OBJECT'
    name: 'RecipeIngredient'
    fields: {
      amount: {
        name: 'amount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      id: {
        name: 'id'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      ingredient: {
        name: 'ingredient'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'Ingredient'; ofType: null }
        }
      }
      ingredientId: {
        name: 'ingredientId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      recipe: {
        name: 'recipe'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
        }
      }
      recipeId: {
        name: 'recipeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
    }
  }
  RecipeIngredientFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'RecipeIngredientFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'and'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'RecipeIngredientFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'or'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'RecipeIngredientFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'id'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'amount'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'StringOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'recipeId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'ingredientId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'recipe'
        type: { kind: 'INPUT_OBJECT'; name: 'RecipeFilterInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'ingredient'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'IngredientFilterInput'
          ofType: null
        }
        defaultValue: null
      }
    ]
  }
  RecipeLike: {
    kind: 'OBJECT'
    name: 'RecipeLike'
    fields: {
      id: {
        name: 'id'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      recipe: {
        name: 'recipe'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
        }
      }
      recipeId: {
        name: 'recipeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      user: {
        name: 'user'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'User'; ofType: null }
        }
      }
      userId: {
        name: 'userId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
    }
  }
  RecipeLikeFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'RecipeLikeFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'and'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'RecipeLikeFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'or'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'RecipeLikeFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'id'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'userId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'recipeId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'user'
        type: { kind: 'INPUT_OBJECT'; name: 'UserFilterInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'recipe'
        type: { kind: 'INPUT_OBJECT'; name: 'RecipeFilterInput'; ofType: null }
        defaultValue: null
      }
    ]
  }
  RecipeLikeSortInput: {
    kind: 'INPUT_OBJECT'
    name: 'RecipeLikeSortInput'
    isOneOf: false
    inputFields: [
      {
        name: 'id'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'userId'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'recipeId'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'user'
        type: { kind: 'INPUT_OBJECT'; name: 'UserSortInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'recipe'
        type: { kind: 'INPUT_OBJECT'; name: 'RecipeSortInput'; ofType: null }
        defaultValue: null
      }
    ]
  }
  RecipeLikesCursorConnection: {
    kind: 'OBJECT'
    name: 'RecipeLikesCursorConnection'
    fields: {
      edges: {
        name: 'edges'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'OBJECT'
              name: 'RecipeLikesCursorEdge'
              ofType: null
            }
          }
        }
      }
      nodes: {
        name: 'nodes'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'RecipeLike'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'PageInfo'; ofType: null }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  RecipeLikesCursorEdge: {
    kind: 'OBJECT'
    name: 'RecipeLikesCursorEdge'
    fields: {
      cursor: {
        name: 'cursor'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      node: {
        name: 'node'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'RecipeLike'; ofType: null }
        }
      }
    }
  }
  RecipeLikesOffsetCollectionSegment: {
    kind: 'OBJECT'
    name: 'RecipeLikesOffsetCollectionSegment'
    fields: {
      items: {
        name: 'items'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'RecipeLike'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'CollectionSegmentInfo'
            ofType: null
          }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  RecipePatchDTOInput: {
    kind: 'INPUT_OBJECT'
    name: 'RecipePatchDTOInput'
    isOneOf: false
    inputFields: [
      {
        name: 'title'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'description'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'instructions'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'cookingTimeMinutes'
        type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        defaultValue: null
      },
      {
        name: 'difficultyLevel'
        type: { kind: 'ENUM'; name: 'DifficultyLevel'; ofType: null }
        defaultValue: null
      },
      {
        name: 'tags'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
          }
        }
        defaultValue: null
      },
      {
        name: 'ingredients'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'RecipeCreateIngredientDTOInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'images'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
          }
        }
        defaultValue: null
      }
    ]
  }
  RecipeSearchCriteriaInput: {
    kind: 'INPUT_OBJECT'
    name: 'RecipeSearchCriteriaInput'
    isOneOf: false
    inputFields: [
      {
        name: 'matching'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'tags'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        defaultValue: null
      },
      {
        name: 'ingredientNames'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        defaultValue: null
      },
      {
        name: 'minCookingTime'
        type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        defaultValue: null
      },
      {
        name: 'maxCookingTime'
        type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        defaultValue: null
      },
      {
        name: 'minRating'
        type: { kind: 'SCALAR'; name: 'Float'; ofType: null }
        defaultValue: null
      },
      {
        name: 'maxRating'
        type: { kind: 'SCALAR'; name: 'Float'; ofType: null }
        defaultValue: null
      },
      {
        name: 'difficultyLevels'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'ENUM'; name: 'DifficultyLevel'; ofType: null }
          }
        }
        defaultValue: null
      },
      {
        name: 'createdAfter'
        type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        defaultValue: null
      },
      {
        name: 'createdBefore'
        type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        defaultValue: null
      },
      {
        name: 'authorId'
        type: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        defaultValue: null
      }
    ]
  }
  RecipeSortInput: {
    kind: 'INPUT_OBJECT'
    name: 'RecipeSortInput'
    isOneOf: false
    inputFields: [
      {
        name: 'id'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'title'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'description'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'instructions'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'cookingTimeMinutes'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'difficultyLevel'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'createdAt'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'updatedAt'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'userId'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'user'
        type: { kind: 'INPUT_OBJECT'; name: 'UserSortInput'; ofType: null }
        defaultValue: null
      }
    ]
  }
  RecipeTag: {
    kind: 'OBJECT'
    name: 'RecipeTag'
    fields: {
      recipe: {
        name: 'recipe'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
        }
      }
      recipeId: {
        name: 'recipeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      tag: {
        name: 'tag'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'Tag'; ofType: null }
        }
      }
      tagId: {
        name: 'tagId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
    }
  }
  RecipeTagFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'RecipeTagFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'and'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'RecipeTagFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'or'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'RecipeTagFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'recipeId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'tagId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'recipe'
        type: { kind: 'INPUT_OBJECT'; name: 'RecipeFilterInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'tag'
        type: { kind: 'INPUT_OBJECT'; name: 'TagFilterInput'; ofType: null }
        defaultValue: null
      }
    ]
  }
  ReciperError: {
    kind: 'OBJECT'
    name: 'ReciperError'
    fields: {
      message: {
        name: 'message'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
    }
  }
  RecipesCursorConnection: {
    kind: 'OBJECT'
    name: 'RecipesCursorConnection'
    fields: {
      edges: {
        name: 'edges'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'RecipesCursorEdge'; ofType: null }
          }
        }
      }
      nodes: {
        name: 'nodes'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'PageInfo'; ofType: null }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  RecipesCursorEdge: {
    kind: 'OBJECT'
    name: 'RecipesCursorEdge'
    fields: {
      cursor: {
        name: 'cursor'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      node: {
        name: 'node'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
        }
      }
    }
  }
  RecipesOffsetCollectionSegment: {
    kind: 'OBJECT'
    name: 'RecipesOffsetCollectionSegment'
    fields: {
      items: {
        name: 'items'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'CollectionSegmentInfo'
            ofType: null
          }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  RegisterUserError: {
    kind: 'UNION'
    name: 'RegisterUserError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  RegisterUserInput: {
    kind: 'INPUT_OBJECT'
    name: 'RegisterUserInput'
    isOneOf: false
    inputFields: [
      {
        name: 'userCreateDto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'INPUT_OBJECT'
            name: 'UserCreateDTOInput'
            ofType: null
          }
        }
        defaultValue: null
      }
    ]
  }
  RegisterUserPayload: {
    kind: 'OBJECT'
    name: 'RegisterUserPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'RegisterUserError'; ofType: null }
          }
        }
      }
      userRegisterPayload: {
        name: 'userRegisterPayload'
        type: { kind: 'OBJECT'; name: 'UserRegisterPayload'; ofType: null }
      }
    }
  }
  Role: {
    kind: 'OBJECT'
    name: 'Role'
    fields: {
      id: {
        name: 'id'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      name: {
        name: 'name'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      userRoles: {
        name: 'userRoles'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'OBJECT'; name: 'UserRole'; ofType: null }
            }
          }
        }
      }
    }
  }
  RoleFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'RoleFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'and'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'RoleFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'or'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'RoleFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'id'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'name'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'StringOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'userRoles'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'ListFilterInputTypeOfUserRoleFilterInput'
          ofType: null
        }
        defaultValue: null
      }
    ]
  }
  SortEnumType: { name: 'SortEnumType'; enumValues: 'ASC' | 'DESC' }
  String: unknown
  StringOperationFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'StringOperationFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'and'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'StringOperationFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'or'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'StringOperationFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'eq'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'neq'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'contains'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'ncontains'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'in'
        type: {
          kind: 'LIST'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'nin'
        type: {
          kind: 'LIST'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'startsWith'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'nstartsWith'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'endsWith'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'nendsWith'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'containsIgnoreCase'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'ncontainsIgnoreCase'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'eqIgnoreCase'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'neqIgnoreCase'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'endsWithIgnoreCase'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'nendsWithIgnoreCase'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'startsWithIgnoreCase'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'nstartsWithIgnoreCase'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      }
    ]
  }
  SubscribeError: {
    kind: 'UNION'
    name: 'SubscribeError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  SubscribeInput: {
    kind: 'INPUT_OBJECT'
    name: 'SubscribeInput'
    isOneOf: false
    inputFields: [
      {
        name: 'subscribeeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  SubscribePayload: {
    kind: 'OBJECT'
    name: 'SubscribePayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'SubscribeError'; ofType: null }
          }
        }
      }
      userSubscription: {
        name: 'userSubscription'
        type: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
      }
    }
  }
  SubscribersCursorConnection: {
    kind: 'OBJECT'
    name: 'SubscribersCursorConnection'
    fields: {
      edges: {
        name: 'edges'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'OBJECT'
              name: 'SubscribersCursorEdge'
              ofType: null
            }
          }
        }
      }
      nodes: {
        name: 'nodes'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'PageInfo'; ofType: null }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  SubscribersCursorEdge: {
    kind: 'OBJECT'
    name: 'SubscribersCursorEdge'
    fields: {
      cursor: {
        name: 'cursor'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      node: {
        name: 'node'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
        }
      }
    }
  }
  SubscribersOffsetCollectionSegment: {
    kind: 'OBJECT'
    name: 'SubscribersOffsetCollectionSegment'
    fields: {
      items: {
        name: 'items'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'CollectionSegmentInfo'
            ofType: null
          }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  Subscription: {
    kind: 'OBJECT'
    name: 'Subscription'
    fields: {
      recipeUpdated: {
        name: 'recipeUpdated'
        type: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
      }
    }
  }
  SubscriptionsCursorConnection: {
    kind: 'OBJECT'
    name: 'SubscriptionsCursorConnection'
    fields: {
      edges: {
        name: 'edges'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'OBJECT'
              name: 'SubscriptionsCursorEdge'
              ofType: null
            }
          }
        }
      }
      nodes: {
        name: 'nodes'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'PageInfo'; ofType: null }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  SubscriptionsCursorEdge: {
    kind: 'OBJECT'
    name: 'SubscriptionsCursorEdge'
    fields: {
      cursor: {
        name: 'cursor'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      node: {
        name: 'node'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
        }
      }
    }
  }
  SubscriptionsOffsetCollectionSegment: {
    kind: 'OBJECT'
    name: 'SubscriptionsOffsetCollectionSegment'
    fields: {
      items: {
        name: 'items'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'CollectionSegmentInfo'
            ofType: null
          }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  Tag: {
    kind: 'OBJECT'
    name: 'Tag'
    fields: {
      id: {
        name: 'id'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      name: {
        name: 'name'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      recipeTags: {
        name: 'recipeTags'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'OBJECT'; name: 'RecipeTag'; ofType: null }
            }
          }
        }
      }
    }
  }
  TagCreateDTOInput: {
    kind: 'INPUT_OBJECT'
    name: 'TagCreateDTOInput'
    isOneOf: false
    inputFields: [
      {
        name: 'name'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  TagFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'TagFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'and'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'TagFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'or'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'TagFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'id'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'name'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'StringOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'recipeTags'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'ListFilterInputTypeOfRecipeTagFilterInput'
          ofType: null
        }
        defaultValue: null
      }
    ]
  }
  TagPatchDTOInput: {
    kind: 'INPUT_OBJECT'
    name: 'TagPatchDTOInput'
    isOneOf: false
    inputFields: [
      {
        name: 'name'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      }
    ]
  }
  TagSearchCriteriaInput: {
    kind: 'INPUT_OBJECT'
    name: 'TagSearchCriteriaInput'
    isOneOf: false
    inputFields: [
      {
        name: 'overallMatching'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      }
    ]
  }
  TagSortInput: {
    kind: 'INPUT_OBJECT'
    name: 'TagSortInput'
    isOneOf: false
    inputFields: [
      {
        name: 'id'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'name'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      }
    ]
  }
  TagsCursorConnection: {
    kind: 'OBJECT'
    name: 'TagsCursorConnection'
    fields: {
      edges: {
        name: 'edges'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'TagsCursorEdge'; ofType: null }
          }
        }
      }
      nodes: {
        name: 'nodes'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'Tag'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'PageInfo'; ofType: null }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  TagsCursorEdge: {
    kind: 'OBJECT'
    name: 'TagsCursorEdge'
    fields: {
      cursor: {
        name: 'cursor'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      node: {
        name: 'node'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'Tag'; ofType: null }
        }
      }
    }
  }
  TagsOffsetCollectionSegment: {
    kind: 'OBJECT'
    name: 'TagsOffsetCollectionSegment'
    fields: {
      items: {
        name: 'items'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'Tag'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'CollectionSegmentInfo'
            ofType: null
          }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  UUID: unknown
  UnlikeRecipeError: {
    kind: 'UNION'
    name: 'UnlikeRecipeError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  UnlikeRecipeInput: {
    kind: 'INPUT_OBJECT'
    name: 'UnlikeRecipeInput'
    isOneOf: false
    inputFields: [
      {
        name: 'recipeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  UnlikeRecipePayload: {
    kind: 'OBJECT'
    name: 'UnlikeRecipePayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'UnlikeRecipeError'; ofType: null }
          }
        }
      }
      recipeLike: {
        name: 'recipeLike'
        type: { kind: 'OBJECT'; name: 'RecipeLike'; ofType: null }
      }
    }
  }
  UnsubscribeError: {
    kind: 'UNION'
    name: 'UnsubscribeError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  UnsubscribeInput: {
    kind: 'INPUT_OBJECT'
    name: 'UnsubscribeInput'
    isOneOf: false
    inputFields: [
      {
        name: 'userId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  UnsubscribePayload: {
    kind: 'OBJECT'
    name: 'UnsubscribePayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'UnsubscribeError'; ofType: null }
          }
        }
      }
      userSubscription: {
        name: 'userSubscription'
        type: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
      }
    }
  }
  UpdateCommentError: {
    kind: 'UNION'
    name: 'UpdateCommentError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  UpdateCommentInput: {
    kind: 'INPUT_OBJECT'
    name: 'UpdateCommentInput'
    isOneOf: false
    inputFields: [
      {
        name: 'commentId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'updateDto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'INPUT_OBJECT'
            name: 'CommentPatchDTOInput'
            ofType: null
          }
        }
        defaultValue: null
      }
    ]
  }
  UpdateCommentPayload: {
    kind: 'OBJECT'
    name: 'UpdateCommentPayload'
    fields: {
      comment: {
        name: 'comment'
        type: { kind: 'OBJECT'; name: 'Comment'; ofType: null }
      }
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'UpdateCommentError'; ofType: null }
          }
        }
      }
    }
  }
  UpdateIngredientError: {
    kind: 'UNION'
    name: 'UpdateIngredientError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  UpdateIngredientInput: {
    kind: 'INPUT_OBJECT'
    name: 'UpdateIngredientInput'
    isOneOf: false
    inputFields: [
      {
        name: 'ingredientId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'updateDto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'INPUT_OBJECT'
            name: 'IngredientPatchDTOInput'
            ofType: null
          }
        }
        defaultValue: null
      }
    ]
  }
  UpdateIngredientPayload: {
    kind: 'OBJECT'
    name: 'UpdateIngredientPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'UNION'
              name: 'UpdateIngredientError'
              ofType: null
            }
          }
        }
      }
      ingredient: {
        name: 'ingredient'
        type: { kind: 'OBJECT'; name: 'Ingredient'; ofType: null }
      }
    }
  }
  UpdateRatingByIdError: {
    kind: 'UNION'
    name: 'UpdateRatingByIdError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  UpdateRatingByIdInput: {
    kind: 'INPUT_OBJECT'
    name: 'UpdateRatingByIdInput'
    isOneOf: false
    inputFields: [
      {
        name: 'ratingId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'patchDto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'INPUT_OBJECT'
            name: 'RatingPatchDTOInput'
            ofType: null
          }
        }
        defaultValue: null
      }
    ]
  }
  UpdateRatingByIdPayload: {
    kind: 'OBJECT'
    name: 'UpdateRatingByIdPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'UNION'
              name: 'UpdateRatingByIdError'
              ofType: null
            }
          }
        }
      }
      rating: {
        name: 'rating'
        type: { kind: 'OBJECT'; name: 'Rating'; ofType: null }
      }
    }
  }
  UpdateRatingForRecipeError: {
    kind: 'UNION'
    name: 'UpdateRatingForRecipeError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  UpdateRatingForRecipeInput: {
    kind: 'INPUT_OBJECT'
    name: 'UpdateRatingForRecipeInput'
    isOneOf: false
    inputFields: [
      {
        name: 'recipeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'patchDto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'INPUT_OBJECT'
            name: 'RatingPatchDTOInput'
            ofType: null
          }
        }
        defaultValue: null
      }
    ]
  }
  UpdateRatingForRecipePayload: {
    kind: 'OBJECT'
    name: 'UpdateRatingForRecipePayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'UNION'
              name: 'UpdateRatingForRecipeError'
              ofType: null
            }
          }
        }
      }
      rating: {
        name: 'rating'
        type: { kind: 'OBJECT'; name: 'Rating'; ofType: null }
      }
    }
  }
  UpdateRecipeError: {
    kind: 'UNION'
    name: 'UpdateRecipeError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  UpdateRecipeInput: {
    kind: 'INPUT_OBJECT'
    name: 'UpdateRecipeInput'
    isOneOf: false
    inputFields: [
      {
        name: 'recipeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'updateDto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'INPUT_OBJECT'
            name: 'RecipePatchDTOInput'
            ofType: null
          }
        }
        defaultValue: null
      }
    ]
  }
  UpdateRecipePayload: {
    kind: 'OBJECT'
    name: 'UpdateRecipePayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'UpdateRecipeError'; ofType: null }
          }
        }
      }
      recipe: {
        name: 'recipe'
        type: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
      }
    }
  }
  UpdateTagError: {
    kind: 'UNION'
    name: 'UpdateTagError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  UpdateTagInput: {
    kind: 'INPUT_OBJECT'
    name: 'UpdateTagInput'
    isOneOf: false
    inputFields: [
      {
        name: 'tagId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'updateDto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'INPUT_OBJECT'
            name: 'TagPatchDTOInput'
            ofType: null
          }
        }
        defaultValue: null
      }
    ]
  }
  UpdateTagPayload: {
    kind: 'OBJECT'
    name: 'UpdateTagPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'UpdateTagError'; ofType: null }
          }
        }
      }
      tag: { name: 'tag'; type: { kind: 'OBJECT'; name: 'Tag'; ofType: null } }
    }
  }
  UpdateUserError: {
    kind: 'UNION'
    name: 'UpdateUserError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  UpdateUserInput: {
    kind: 'INPUT_OBJECT'
    name: 'UpdateUserInput'
    isOneOf: false
    inputFields: [
      {
        name: 'userPatchDto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'INPUT_OBJECT'
            name: 'UserPatchDTOInput'
            ofType: null
          }
        }
        defaultValue: null
      }
    ]
  }
  UpdateUserPayload: {
    kind: 'OBJECT'
    name: 'UpdateUserPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'UNION'; name: 'UpdateUserError'; ofType: null }
          }
        }
      }
      user: {
        name: 'user'
        type: { kind: 'OBJECT'; name: 'User'; ofType: null }
      }
    }
  }
  UpdateUserProfilePhotoError: {
    kind: 'UNION'
    name: 'UpdateUserProfilePhotoError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  UpdateUserProfilePhotoInput: {
    kind: 'INPUT_OBJECT'
    name: 'UpdateUserProfilePhotoInput'
    isOneOf: false
    inputFields: [
      {
        name: 'file'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Upload'; ofType: null }
        }
        defaultValue: null
      }
    ]
  }
  UpdateUserProfilePhotoPayload: {
    kind: 'OBJECT'
    name: 'UpdateUserProfilePhotoPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'UNION'
              name: 'UpdateUserProfilePhotoError'
              ofType: null
            }
          }
        }
      }
      user: {
        name: 'user'
        type: { kind: 'OBJECT'; name: 'User'; ofType: null }
      }
    }
  }
  Upload: unknown
  UpsertRecipeRatingError: {
    kind: 'UNION'
    name: 'UpsertRecipeRatingError'
    fields: {}
    possibleTypes: 'ReciperError'
  }
  UpsertRecipeRatingInput: {
    kind: 'INPUT_OBJECT'
    name: 'UpsertRecipeRatingInput'
    isOneOf: false
    inputFields: [
      {
        name: 'createDto'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'INPUT_OBJECT'
            name: 'RatingCreateDTOInput'
            ofType: null
          }
        }
        defaultValue: null
      }
    ]
  }
  UpsertRecipeRatingPayload: {
    kind: 'OBJECT'
    name: 'UpsertRecipeRatingPayload'
    fields: {
      errors: {
        name: 'errors'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'UNION'
              name: 'UpsertRecipeRatingError'
              ofType: null
            }
          }
        }
      }
      rating: {
        name: 'rating'
        type: { kind: 'OBJECT'; name: 'Rating'; ofType: null }
      }
    }
  }
  User: {
    kind: 'OBJECT'
    name: 'User'
    fields: {
      bio: {
        name: 'bio'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
      }
      comments: {
        name: 'comments'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'OBJECT'; name: 'Comment'; ofType: null }
            }
          }
        }
      }
      createdAt: {
        name: 'createdAt'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
      }
      id: {
        name: 'id'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      images: {
        name: 'images'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'OBJECT'; name: 'UserImage'; ofType: null }
            }
          }
        }
      }
      isActive: {
        name: 'isActive'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        }
      }
      isSubscribed: {
        name: 'isSubscribed'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        }
      }
      likedRecipes: {
        name: 'likedRecipes'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'OBJECT'; name: 'RecipeLike'; ofType: null }
            }
          }
        }
      }
      likesCount: {
        name: 'likesCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
      profilePictureUrl: {
        name: 'profilePictureUrl'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
      }
      ratings: {
        name: 'ratings'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'OBJECT'; name: 'Rating'; ofType: null }
            }
          }
        }
      }
      recipes: {
        name: 'recipes'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'OBJECT'; name: 'Recipe'; ofType: null }
            }
          }
        }
      }
      recipesCount: {
        name: 'recipesCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
      subscribers: {
        name: 'subscribers'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
            }
          }
        }
      }
      subscribersCount: {
        name: 'subscribersCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
      subscriptions: {
        name: 'subscriptions'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'OBJECT'; name: 'UserSubscription'; ofType: null }
            }
          }
        }
      }
      totalRecipesLikes: {
        name: 'totalRecipesLikes'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
      updatedAt: {
        name: 'updatedAt'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
      }
      userRoles: {
        name: 'userRoles'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'OBJECT'; name: 'UserRole'; ofType: null }
            }
          }
        }
      }
      username: {
        name: 'username'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
    }
  }
  UserCreateDTOInput: {
    kind: 'INPUT_OBJECT'
    name: 'UserCreateDTOInput'
    isOneOf: false
    inputFields: [
      {
        name: 'username'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'email'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'password'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'profilePictureUrl'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'bio'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      }
    ]
  }
  UserFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'UserFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'and'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'UserFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'or'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'UserFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'id'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'username'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'StringOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'email'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'StringOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'passwordHash'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'StringOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'profilePictureUrl'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'StringOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'bio'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'StringOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'isActive'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'BooleanOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'createdAt'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'DateTimeOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'updatedAt'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'DateTimeOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'recipes'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'ListFilterInputTypeOfRecipeFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'comments'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'ListFilterInputTypeOfCommentFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'ratings'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'ListFilterInputTypeOfRatingFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'userRoles'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'ListFilterInputTypeOfUserRoleFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'subscriptions'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'ListFilterInputTypeOfUserSubscriptionFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'subscribers'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'ListFilterInputTypeOfUserSubscriptionFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'likedRecipes'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'ListFilterInputTypeOfRecipeLikeFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'images'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'ListFilterInputTypeOfUserImageFilterInput'
          ofType: null
        }
        defaultValue: null
      }
    ]
  }
  UserImage: {
    kind: 'OBJECT'
    name: 'UserImage'
    fields: {
      createdAt: {
        name: 'createdAt'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
      }
      id: {
        name: 'id'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      order: {
        name: 'order'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
      publicId: {
        name: 'publicId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      url: {
        name: 'url'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      user: {
        name: 'user'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'User'; ofType: null }
        }
      }
      userId: {
        name: 'userId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
    }
  }
  UserImageFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'UserImageFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'and'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'UserImageFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'or'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'UserImageFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'id'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'publicId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'StringOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'url'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'StringOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'order'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'IntOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'userId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'createdAt'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'DateTimeOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'user'
        type: { kind: 'INPUT_OBJECT'; name: 'UserFilterInput'; ofType: null }
        defaultValue: null
      }
    ]
  }
  UserLikesCursorConnection: {
    kind: 'OBJECT'
    name: 'UserLikesCursorConnection'
    fields: {
      edges: {
        name: 'edges'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'OBJECT'
              name: 'UserLikesCursorEdge'
              ofType: null
            }
          }
        }
      }
      nodes: {
        name: 'nodes'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'RecipeLike'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'PageInfo'; ofType: null }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  UserLikesCursorEdge: {
    kind: 'OBJECT'
    name: 'UserLikesCursorEdge'
    fields: {
      cursor: {
        name: 'cursor'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      node: {
        name: 'node'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'RecipeLike'; ofType: null }
        }
      }
    }
  }
  UserLikesOffsetCollectionSegment: {
    kind: 'OBJECT'
    name: 'UserLikesOffsetCollectionSegment'
    fields: {
      items: {
        name: 'items'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'RecipeLike'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'CollectionSegmentInfo'
            ofType: null
          }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  UserLoginPayload: {
    kind: 'OBJECT'
    name: 'UserLoginPayload'
    fields: {
      token: {
        name: 'token'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
      }
      user: {
        name: 'user'
        type: { kind: 'OBJECT'; name: 'User'; ofType: null }
      }
    }
  }
  UserPatchDTOInput: {
    kind: 'INPUT_OBJECT'
    name: 'UserPatchDTOInput'
    isOneOf: false
    inputFields: [
      {
        name: 'username'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'profilePictureUrl'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'bio'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'isActive'
        type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        defaultValue: null
      }
    ]
  }
  UserRegisterPayload: {
    kind: 'OBJECT'
    name: 'UserRegisterPayload'
    fields: {
      token: {
        name: 'token'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
      }
      user: {
        name: 'user'
        type: { kind: 'OBJECT'; name: 'User'; ofType: null }
      }
    }
  }
  UserRole: {
    kind: 'OBJECT'
    name: 'UserRole'
    fields: {
      id: {
        name: 'id'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      role: {
        name: 'role'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'Role'; ofType: null }
        }
      }
      roleId: {
        name: 'roleId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      user: {
        name: 'user'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'User'; ofType: null }
        }
      }
      userId: {
        name: 'userId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
    }
  }
  UserRoleFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'UserRoleFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'and'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'UserRoleFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'or'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'UserRoleFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'id'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'userId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'roleId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'user'
        type: { kind: 'INPUT_OBJECT'; name: 'UserFilterInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'role'
        type: { kind: 'INPUT_OBJECT'; name: 'RoleFilterInput'; ofType: null }
        defaultValue: null
      }
    ]
  }
  UserSearchCriteriaInput: {
    kind: 'INPUT_OBJECT'
    name: 'UserSearchCriteriaInput'
    isOneOf: false
    inputFields: [
      {
        name: 'matching'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      },
      {
        name: 'minAverageRating'
        type: { kind: 'SCALAR'; name: 'Float'; ofType: null }
        defaultValue: null
      },
      {
        name: 'maxAverageRating'
        type: { kind: 'SCALAR'; name: 'Float'; ofType: null }
        defaultValue: null
      },
      {
        name: 'minRecipesCount'
        type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        defaultValue: null
      },
      {
        name: 'maxRecipesCount'
        type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        defaultValue: null
      },
      {
        name: 'registeredAfter'
        type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        defaultValue: null
      },
      {
        name: 'registeredBefore'
        type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        defaultValue: null
      },
      {
        name: 'hasPublishedRecipes'
        type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null }
        defaultValue: null
      },
      {
        name: 'recipeTagNames'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        defaultValue: null
      }
    ]
  }
  UserSortInput: {
    kind: 'INPUT_OBJECT'
    name: 'UserSortInput'
    isOneOf: false
    inputFields: [
      {
        name: 'id'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'username'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'email'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'passwordHash'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'profilePictureUrl'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'bio'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'isActive'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'createdAt'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'updatedAt'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      }
    ]
  }
  UserSubscription: {
    kind: 'OBJECT'
    name: 'UserSubscription'
    fields: {
      id: {
        name: 'id'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      subscribee: {
        name: 'subscribee'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'User'; ofType: null }
        }
      }
      subscribeeId: {
        name: 'subscribeeId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
      subscriber: {
        name: 'subscriber'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'User'; ofType: null }
        }
      }
      subscriberId: {
        name: 'subscriberId'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
      }
    }
  }
  UserSubscriptionFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'UserSubscriptionFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'and'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'UserSubscriptionFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'or'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'INPUT_OBJECT'
              name: 'UserSubscriptionFilterInput'
              ofType: null
            }
          }
        }
        defaultValue: null
      },
      {
        name: 'id'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'subscriberId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'subscribeeId'
        type: {
          kind: 'INPUT_OBJECT'
          name: 'UuidOperationFilterInput'
          ofType: null
        }
        defaultValue: null
      },
      {
        name: 'subscriber'
        type: { kind: 'INPUT_OBJECT'; name: 'UserFilterInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'subscribee'
        type: { kind: 'INPUT_OBJECT'; name: 'UserFilterInput'; ofType: null }
        defaultValue: null
      }
    ]
  }
  UserSubscriptionSearchCriteriaInput: {
    kind: 'INPUT_OBJECT'
    name: 'UserSubscriptionSearchCriteriaInput'
    isOneOf: false
    inputFields: [
      {
        name: 'matching'
        type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        defaultValue: null
      }
    ]
  }
  UserSubscriptionSortInput: {
    kind: 'INPUT_OBJECT'
    name: 'UserSubscriptionSortInput'
    isOneOf: false
    inputFields: [
      {
        name: 'id'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'subscriberId'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'subscribeeId'
        type: { kind: 'ENUM'; name: 'SortEnumType'; ofType: null }
        defaultValue: null
      },
      {
        name: 'subscriber'
        type: { kind: 'INPUT_OBJECT'; name: 'UserSortInput'; ofType: null }
        defaultValue: null
      },
      {
        name: 'subscribee'
        type: { kind: 'INPUT_OBJECT'; name: 'UserSortInput'; ofType: null }
        defaultValue: null
      }
    ]
  }
  UsersCursorConnection: {
    kind: 'OBJECT'
    name: 'UsersCursorConnection'
    fields: {
      edges: {
        name: 'edges'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'UsersCursorEdge'; ofType: null }
          }
        }
      }
      nodes: {
        name: 'nodes'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'User'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'PageInfo'; ofType: null }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  UsersCursorEdge: {
    kind: 'OBJECT'
    name: 'UsersCursorEdge'
    fields: {
      cursor: {
        name: 'cursor'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
      node: {
        name: 'node'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'OBJECT'; name: 'User'; ofType: null }
        }
      }
    }
  }
  UsersOffsetCollectionSegment: {
    kind: 'OBJECT'
    name: 'UsersOffsetCollectionSegment'
    fields: {
      items: {
        name: 'items'
        type: {
          kind: 'LIST'
          name: never
          ofType: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'User'; ofType: null }
          }
        }
      }
      pageInfo: {
        name: 'pageInfo'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: {
            kind: 'OBJECT'
            name: 'CollectionSegmentInfo'
            ofType: null
          }
        }
      }
      totalCount: {
        name: 'totalCount'
        type: {
          kind: 'NON_NULL'
          name: never
          ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
      }
    }
  }
  UuidOperationFilterInput: {
    kind: 'INPUT_OBJECT'
    name: 'UuidOperationFilterInput'
    isOneOf: false
    inputFields: [
      {
        name: 'eq'
        type: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        defaultValue: null
      },
      {
        name: 'neq'
        type: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        defaultValue: null
      },
      {
        name: 'in'
        type: {
          kind: 'LIST'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'nin'
        type: {
          kind: 'LIST'
          name: never
          ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        }
        defaultValue: null
      },
      {
        name: 'gt'
        type: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        defaultValue: null
      },
      {
        name: 'ngt'
        type: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        defaultValue: null
      },
      {
        name: 'gte'
        type: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        defaultValue: null
      },
      {
        name: 'ngte'
        type: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        defaultValue: null
      },
      {
        name: 'lt'
        type: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        defaultValue: null
      },
      {
        name: 'nlt'
        type: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        defaultValue: null
      },
      {
        name: 'lte'
        type: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        defaultValue: null
      },
      {
        name: 'nlte'
        type: { kind: 'SCALAR'; name: 'UUID'; ofType: null }
        defaultValue: null
      }
    ]
  }
}

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never
  query: 'Query'
  mutation: 'Mutation'
  subscription: 'Subscription'
  types: introspection_types
}

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}
