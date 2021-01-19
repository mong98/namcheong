CREATE PROCEDURE [dbo].[sp_GetDocuments]  
AS  
BEGIN  
    SELECT * FROM [JobPortal].[dbo].[Document]
END  

CREATE PROCEDURE [dbo].[sp_AddDocuments] @Document [varchar](100)
AS
BEGIN
    INSERT INTO [JobPortal].[dbo].[Document] ([Document]) VALUES (@Document);
    SELECT SCOPE_IDENTITY() AS [Id]
END

CREATE PROCEDURE [dbo].[sp_DeleteDocuments] @Id [smallint]
AS
BEGIN
    DELETE FROM [JobPortal].[dbo].[Document] WHERE [Id] = @Id
END

CREATE PROCEDURE [dbo].[sp_UpdateDocuments] @Id [smallint], @Document [varchar](100)
AS
BEGIN
    UPDATE [JobPortal].[dbo].[Document] SET [Document] = @Document, [UpdatedDate] = GETDATE() WHERE [Id] = @Id
END