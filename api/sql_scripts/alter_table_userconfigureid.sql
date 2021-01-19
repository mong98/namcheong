USE [JobPortal]
GO

/****** Object:  Table [dbo].[UserConfigure]    Script Date: 25/12/2020 1:55:20 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER TABLE [dbo].[UserConfigure]
ADD
	[Name] [varchar](100) NULL,
	[CrewingExecSignature] [varchar](100) NULL,
	[CrewingManagerSignature] [varchar](100) NULL,
	[Signature] [varchar](100) NULL,
	[ManagerId] [int] NULL,
	[ManagerName] [varchar](100) NULL;
GO
