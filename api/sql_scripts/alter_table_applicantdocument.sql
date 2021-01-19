USE [JobPortal]
GO

/****** Object:  Table [dbo].[ApplicantDocument]    Script Date: 21/12/2020 12:01:39 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER TABLE [dbo].[ApplicantDocument]
ADD Grade varchar (255) NULL,
IssuingAuthority varchar (255) NULL,
Charterer varchar (100) NULL,
ChartererOthers varchar (100) NULL,
DynamicPositionCertType int NULL,
DynamicPositionCertFileName varchar (100) NULL;
GO
