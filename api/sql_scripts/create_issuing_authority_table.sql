USE [JobPortal]
GO

/****** Object:  Table [dbo].[Position]    Script Date: 6/12/2020 12:02:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[IssuingAuthority](
	[Id] [smallint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NULL,
	[Description] [varchar](100) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [varchar](100) NULL,
	[UpdatedDate] [datetime] NULL
) ON [PRIMARY]
GO