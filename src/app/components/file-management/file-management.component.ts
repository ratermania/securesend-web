import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DriveItem } from "src/app/models/drive-item.model";
import { User } from "src/app/models/user.model";
import { FileService } from "src/app/services/file.service";
import { UserService } from "src/app/services/user.service";
import { environment } from "src/environments/environment";

@Component({
    selector: 'app-file-management',
    templateUrl: './file-management.component.html',
})
export class FileManagementComponent implements OnInit {
    environment = environment
    user = new User();
    files: DriveItem[] = [];
    columns: string[] = ['name', 'uploaded'];
    token = sessionStorage.getItem('token');

    constructor(private fileService: FileService, private userService: UserService) { }

    ngOnInit() {
        this.user = this.userService.getUserFromToken().value;

        this.getFiles();
        setInterval(() => { this.getFiles() }, 1000 * 60);
    }

    getFiles() {
        this.fileService.getFileList().subscribe(response => {
            this.files = response;
        });
    }

    uploadFile(fileInput: HTMLInputElement) {

        const file = fileInput.files?.item(0) as File;

        // if (file !== null || file !== undefined) {
        this.fileService.uploadFile(file).subscribe(() => {
            this.getFiles();
        });
        // }
    }

    logout() {
        this.userService.logout();
    }
}