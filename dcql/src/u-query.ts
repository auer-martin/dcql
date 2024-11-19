import * as v from 'valibot';
import type { ClaimsQuery } from './dcql-query/m-claims-query.js';
export const idRegex = /^[a-zA-Z0-9_-]+$/;

export const vCredentialFormat = v.picklist([
  'mso_mdoc',
  'vc+sd-jwt',
  'jwt_vc_json',
  'jwt_vc_json-ld',
]);

export const vNonEmptyArray = <T extends unknown[]>() => {
  return v.custom<[T[number], ...T]>(input =>
    (input as T).length > 0 ? true : false
  );
};

export const vIdString = v.pipe(v.string(), v.regex(idRegex));

export namespace Mdoc {
  export type NameSpaces = Record<string, Record<string, unknown>>;
  export interface Credential {
    docType: string;
    namespaces: NameSpaces;
  }
}
export type Mdoc = Mdoc.Credential;

export namespace SdJwtVc {
  export type Claims = v.InferOutput<typeof ClaimsQuery.vJsonRecord>;
  export interface Credential {
    vct: string;
    claims: Claims;
  }
}
export type SdJwtVc = SdJwtVc.Credential;

export type Credential = Mdoc | SdJwtVc;
