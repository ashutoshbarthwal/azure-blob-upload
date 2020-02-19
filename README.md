## Folder Structure

```
node-app
|
└───app.js
|
└───routes
│   │ 
│   │ routes.js
│
└───app
│   │
│   └───http
│        │   
│        └───controllers
│            │ 
│            │ AzureController.js
│
└───services
    │ 
    │ AzureService.js

react-app
|
└───src
    │   App.tsx
    │
    └───azure-storage
        │
        └───components
        │   │   ContainerList.tsx
        │   │   InputFile.tsx
        │   │   ItemsDeleted.tsx
        │   │   ItemsDownloaded.tsx
        │   │   ItemsList.tsx
        │   │   ItemsUploaded.tsx
        │   │   SelectedContainer.tsx
        │
        └───services
        │   │   BlobDeletesViewState.ts
        │   │   BlobDownloadedsViewState.ts
        │   │   BlobSharedViewState.ts
        │   │   BlobStorageViewState.ts
        │   │   BlobUploadesViewState.ts
        │   │   SasGeneratorService.ts
        │
        └───types
        │   │   azure-storage.d.ts
        │
        └───contexts
        │   │   * viewStateContext.tsx


* Project specific files
```

---

Steps to follow 

1 Clone the repo 

````sh
git clone https://github.com/ashutoshbarthwal/azure-blob-upload.git
````

2 go to app directory

````sh
cd azure-blob-upload
````
3 update <code>node-app/config/azure.js</code>

````

 /*
  |--------------------------------------------------------------------------
  | Azure Account Name
  |--------------------------------------------------------------------------
  */
  account: 'ACCOUNT_NAME',

  /*
  |--------------------------------------------------------------------------
  | Azure Account Key
  |--------------------------------------------------------------------------
  */
  accountKey: 'ACCOUNT_KEY',

  /*
  |--------------------------------------------------------------------------
  | Connection String
  |--------------------------------------------------------------------------
  */
  connectionString: 'CONNECTION_STRING',
  

````

4 install required packages

````sh
npm --prefix node-app install | yarn --cwd react-app install
````

## Run via npm 

````sh 
npm --prefix react-app run start | npm --prefix node-app run start
````

## Run via Docker

````sh

docker-compose up --build

````
