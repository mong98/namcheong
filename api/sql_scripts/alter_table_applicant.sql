USE [JobPortal]
GO

/****** Object:  Table [dbo].[ApplicantDocument]    Script Date: 21/12/2020 12:01:39 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER TABLE [dbo].[Applicant]
ADD [PermanentAddress2] [varchar](100) NULL,
[PermanentAddress3] [varchar](100) NULL,
[Residentialaddress2] [varchar](100) NULL,
[Residentialaddress3] [varchar](100) NULL,
[PDPAChk] [varchar](1) NULL,
[MiddleName] [varchar](100) NULL,
[LastName] [varchar](100) NULL,
[Education] [smallint] NULL,
[EducationFileName] [varchar](100) NULL;
GO
