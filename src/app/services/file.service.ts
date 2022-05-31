import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DriveItem } from "../models/drive-item.model";

@Injectable({
    providedIn: "root"
})
export class FileService {

    constructor(private httpClient: HttpClient) { }

    public getFileList(): Observable<DriveItem[]> {
        return this.httpClient.get<DriveItem[]>(`${environment.apiUrl}/files/list`);
    }

    public uploadFile(file: any): Observable<any> {
        const formData = new FormData();
        formData.append('File', file);

        return this.httpClient.post(`${environment.apiUrl}/files`, formData);
    }
}