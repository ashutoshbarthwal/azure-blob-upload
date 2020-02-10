import { Axios } from 'axios-observable';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlobStorageRequest } from '../types/azure-storage';

export class SasGeneratorService {
  getSasToken(): Observable<BlobStorageRequest> {
    const instance = Axios.create({baseURL: 'http://localhost:3001'})
    return instance.get<BlobStorageRequest>(
      '/generateSasToken'
    ).pipe(map(res => res.data));
  }
}
